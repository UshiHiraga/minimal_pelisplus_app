const app = Vue.createApp({
    components: {
        enhancedDialog: {
            props: {
                "title": { type: String, required: true },
                "isOpened": { type: Boolean, default: false },
                "canClose": { type: Boolean, default: false },
                "position": { type: String, required: true, validator(value) { return ["above", "below"].includes(value) } }
            },
            methods: {
                closeDialog() { this.$refs["main_dialog"].close() }
            },
            template: /*html*/ `
            <dialog ref="main_dialog" class="dialog_enhanced" :class="position">
                <section class="title_container">
                    <p>{{title}}</p>
                    <slot name="external_button"></slot>
                    <button
                        class="i main_button" 
                        :title="(canClose) ? 'Presiona para cerrar' : null"
                        :class="(canClose) ? null : 'disabled' "
                        v-on="(canClose) ? { click: closeDialog } : {}"
                    >x</button>
                </section>
                <section class="body_container">
                    <slot name="body_content"></slot>
                </section>
            </dialog>`,
        }
    },
    data(){
        return {
            "currentTitle": "",
            "lastSearchData": [],
            "currentMovieServer": [],
            "isSearching": false,
            "actualVideoServer": ""
        }
    },
    methods: {
        async search(){
            const title_search = this.currentTitle.trim();
            if(!title_search) throw new Error("Title to search is void.");

            this.lastSearchData = [];
            this.isSearching = true;
            let a = await fetch(MAIN_SERVER + "/api/searchByName?title=" + title_search);
            let b = await a.json();
            this.isSearching = false;
            this.lastSearchData = b;
        },
        async getMovieServers(id){
            let a = await fetch(MAIN_SERVER + "/api/getMovieServers?id=" + id);
            let b = await a.json();
            console.log(b);

            this.currentMovieServer = b;
            document.getElementById("result_dialog").showModal();
        },
        loadMovieVideo(server_url){
            this.actualVideoServer = server_url;
            this.$refs["video_iframe"].requestFullscreen();
        }
    }
})

app.mount("#main_app");
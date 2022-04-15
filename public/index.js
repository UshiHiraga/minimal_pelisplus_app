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
                openDialog() { this.$refs["main_dialog"].showModal() },
                closeDialog() { this.$refs["main_dialog"].close() }
            },
            template: /*html*/ `
            <dialog ref="main_dialog" class="dialog_enhanced" :class="position">
                <section class="title_container">
                    <p>{{title}}</p>
                    <slot name="external_button"></slot>
                    <button class="i main_button" :title="(canClose) ? 'Presiona para cerrar' : null"
                        :class="(canClose) ? null : 'disabled' " v-on="(canClose) ? { click: closeDialog } : {}">
                    close</button>
                </section>
                <section class="body_container">
                    <slot name="body_content"></slot>
                </section>
            </dialog>`,
        }
    },
    data() {
        return {
            "currentTitle": "",
            "lastSearchData": [],
            "currentMovieServer": [],
            "isSearching": false,
            "actualVideoServer": ""
        }
    },
    methods: {
        async resquestMoviesToApi(textToSearch) { return (await (await fetch("/api/searchByName?title=" + textToSearch)).json()) },
        async resquestMovieServersToApi(movieId) { return (await (await fetch("/api/getMovieServers?id=" + movieId)).json()) },
        toggleLoadingBanner() { this.isSearching = !this.isSearching },
        async search() {
            const currentTitle = this.currentTitle.trim();
            if (!currentTitle) throw new Error("Title to search is void.");
            this.lastSearchData = [];
            this.toggleLoadingBanner();
            this.lastSearchData = await this.resquestMoviesToApi(currentTitle);
            this.toggleLoadingBanner();
        },
        async getMovieServers(id) {
            this.currentMovieServer = [];
            this.toggleLoadingBanner();
            this.currentMovieServer = await this.resquestMovieServersToApi(id);
            this.toggleLoadingBanner();
            this.$refs["movies_server_dialog"].openDialog();
        }
    }
})

window.app_data	 = app.mount("#main_app");
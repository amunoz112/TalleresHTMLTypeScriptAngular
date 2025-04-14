"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serie = void 0;
class Serie {
    constructor(id, name, studio, seasons, description, url, imgurl) {
        this.name = name;
        this.id = id;
        this.seasons = seasons;
        this.description = description;
        this.url = url;
        this.studio = studio;
        this.imgurl = imgurl;
    }
}
exports.Serie = Serie;

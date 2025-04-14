export class Serie {

    id : number;
    name: string;
    seasons: number;
    description: string;
    url: string;
    studio: string;
    imgurl: string;

    constructor(id: number,name: string, studio: string,  seasons: number, description: string, url: string, imgurl: string) {
      this.name = name;
      this.id = id;
      this.seasons = seasons;
      this.description = description;
      this.url = url;
      this.studio = studio;
      this.imgurl = imgurl;
    }
}
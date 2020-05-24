export class Presentation {
    PresentationID: number;
    Name: string;
    Abbrevation: string;
    Descripton: string;
    IsActivated: boolean;

    constructor(id: number, name: string, abbreviation: string, description: string, isActivated: boolean){
        this.PresentationID = id;
        this.Name = name;
        this.Abbrevation = abbreviation;
        this.Descripton = description;
        this.IsActivated = isActivated;
    }
}

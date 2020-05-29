export class Presentation {
    PresentationID: number;
    Name: string;
    Abbrevation: string;
    Descripton: string;
    CreatedDate: Date;
    ModifiedDate: Date;
    IsActivated: boolean;

    constructor(id: number, name: string, abbreviation: string, description: string, createdDate: Date,
                modifiedDate: Date, isActivated: boolean){
        this.PresentationID = id;
        this.Name = name;
        this.Abbrevation = abbreviation;
        this.Descripton = description;
        this.CreatedDate = createdDate;
        this.ModifiedDate = modifiedDate;
        this.IsActivated = isActivated;
    }
}

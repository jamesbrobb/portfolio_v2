
export interface TagDTO {

    id: string;
    label: string;
    description: string;
    family: string;
    locale: string;

    attributes: {
        category: any;
        subcategories: any;
        compassId: any;
        topic: any;
        theme: any;
        examples: any;
        categories: any;
    };
}

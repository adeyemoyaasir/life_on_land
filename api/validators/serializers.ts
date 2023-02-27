// experimenting on creating object serialization using nodejs 
// don't use this class except you know what you are doing
// copyright Caleb Oguntunde Fiyinfoluwa 
// url https://github.com/oasisMystre

export class BaseSerializer<T> {
    private _data: object;

    public errors: Error[] = [];

    constructor(data: object) {
        this._data = data;
    }

    public get data(): T {
        return this._data as T;
    }

    public isValid(raiseError = false) {
        for (const field of new this.Meta().fields as [string]) {
            const serializer: Serializer = this[field];
            serializer.validate(field, this.data[field], () => { }, (error) => {
                if (raiseError)
                    throw error;
                else
                    this.errors.push(error);
            });
        }

        return this.errors.length == 0;
    }

    public Meta = class {
        fields: string[] = [];
    }
}

export class Serializer {
    private required: boolean;

    constructor(required: boolean = true) {
        this.required = required;
    }

    validate(name, data, onSuccess: () => void, onError: (error: Error) => void) {
        if (this.required)
            if (data == null)
                onError(Error(name + " is required"));

        onSuccess();
    }
}
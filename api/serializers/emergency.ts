import Emergency from "../models/emergency";
import { BaseSerializer, Serializer } from "../validators/serializers";

export default class EmergencySerializer extends BaseSerializer <Emergency> {
    name: Serializer = new Serializer();
    description: Serializer = new Serializer();

    constructor(data: object) {
        super(data);
    }

    public override Meta = class {
        fields: string[] = ["name", "description"];
    }
}
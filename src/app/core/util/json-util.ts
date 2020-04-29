export class JsonUtils {

    IsJsonString(str:any) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    parse(str:any) {
        JSON.parse(str);
    }

}
import { Base } from "./base.js";

export class Constant extends Base {
    static TODAY = Constant.getCurrentDate();

    static AUTO_COMPLETE_FIELD_IDS = [];

    static FINISHED_EXE_MSG = "===>>>>>>> Finished Execution ===>>>>>>>";

    static FINISHED_APP_LOADING_MSG =
        "=====>>>>>>>>>>>>>>===\n=====>>>>>>>>>>>>>>>>>>>>>=====\nFinished Loading....\nThe Application Is Ready...\n=====>>>>>>>>>>>>>>>>>>>>>=====\n=====>>>>>>>>>>>>>>>>>>>>>=====";
}

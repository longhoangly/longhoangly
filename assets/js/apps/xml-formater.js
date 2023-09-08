import { Common } from "../base/common.js";
import { Tool } from "../tool.js";

$(document).ready(async () => {
    var editor = await Tool.setupEditor("xml-formatted");

    $("#formatXml").click(async () => {
        let inputTxt = editor.getValue();
        let formatedXml = await XmlFormater.formatXml(inputTxt);
        editor.setValue(formatedXml);
    });

    $("#clearXml").click(() => {
        editor.setValue("");
    });
});

export class XmlFormater {
    static async formatXml(xml, tab) {
        // tab = optional indent value, default is tab (\t)
        var formatted = "",
            indent = "";
        tab = tab || "\t";
        xml.split(/>\s*</).forEach(function (node) {
            if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent by one 'tab'
            formatted += indent + "<" + node + ">\r\n";
            if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab; // increase indent
        });
        return formatted.substring(1, formatted.length - 3);
    }
}

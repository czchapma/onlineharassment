var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/\sthe\s+/gi, 'IT WORKS!!!!!');
            replacedText = replacedText.replace(/\shate\s/gi, ' love ');
            replacedText = replacedText.replace(/badword1/gi, ' All my friends have birthdays this year! ');
            replacedText = replacedText.replace(/badword2/gi, ' I\'m pedaling backward!');

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}

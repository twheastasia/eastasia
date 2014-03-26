
var target = UIATarget.localTarget();
var app = target.frontMostApp();
var tabBar = app.mainWindow().tabBar();


//UIAElement层次结构
target.logElementTree();
//你可以通过下面的代码来访问文本框：
var textField = UIATarget.localTarget().frontMostApp().mainWindow().textFields()[0];
//你可以选择通过从0开始的索引或者这个元素的名称来访问这个元素，例如：你也可以通过下面的代码来访问文本控件。
var textField = UIATarget.localTarget().frontMostApp().mainWindow().textFields()["User Text"];

//每一个UIAElement对象的子控件可以通过下面的方法进行访问：
//buttons(), images(), scrollViews(),textFields(), webViews(), segmentedControls(), sliders(), staticTexts(), switches(), tabBar(),tableViews(), textViews(), toolbar(), toolbars()
//UIAElement有几个属性：name, value, elements, parent。


var destinationScreen = "Recipes";
if (tabBar.selectedButton().name() != destinationScreen) {
        tabBar.buttons()[destinationScreen].tap();
}

//press a key on keyboard
app.keyboard().buttons()["return"].tap();

//tap
app.navigationBar().buttons()["Add"].tap();
target.tap({x:100, y:200});
target.doubleTap({x:100, y:200});
target.twoFingerTap({x:100, y:200});

//pinching
target.pinchOpenFromToForDuration({x:20, y:100}, {x:100, y:500}, 2);
target.pinchCloseFromToForDuration({x:20, y:100}, {x:100, y:500}, 2);

//dragging
target.dragFromToForDuration({x:20, y:100}, {x:100, y:500}, 2);

//flicking
target.flickFromTo({x:20, y:100}, {x:100, y:500});

//input text
var textContent = "test for text contents";
app.mainWindow().textFields()[0].setValue(textContent);

//导航应用中标签
//var tabBar = UIATarget.localTarget().frontMostApp().mainWindow().tabBar();
var selectedTabName = tabBar.selectedButton().name();
if (selectedTabName != "Unit Conversion") {
        tabBar.buttons()["Unit Conversion"].tap();
}

//scroll
app.mainWindow().tableViews()[0].scrollToElementWithPredicate("name beginswith 'Pie'");

//timeout
target.pushTimeout(2);
target.popTimeout();

//delay
target.delay(2);

//assert
var cell = UIATarget.localTarget().frontMostApp().mainWindow().tableViews()[0].cells().firstWithPredicate("name beginswith ‘Tarte’");

if (cell.isValid()) {//is legal or illegal
        UIALogger.logPass(testName);
}
else {
        UIALogger.logFail(testName);
}

//output logs
var testName = "Module 001 Test";
UIALogger.logStart(testName);
//some test code
UIALogger.logMessage("Starting Module 001 branch 2, validating input.");
//capture a screenshot with a specified name
UIATarget.localTarget().captureScreenWithName("SS001-2_AddedIngredient");//screen snapshot
//more test code
UIALogger.logPass(testName);//or logFail(testName);

//process outside alert
UIATarget.onAlert = function onAlert(alert) {
        var title = alert.name();
            UIALogger.logWarning("Alert with title '" + title + "' encountered.");
                // return false to use the default handler
                    return false;
}

//process inside alert
UIATarget.onAlert = function onAlert(alert) {
    var title = alert.name();
    UIALogger.logWarning("Alert with title '" + title + "' encountered.");
    if (title == "The Alert We Expected") {
        alert.buttons()["Continue"].tap();
        return true; //alert handled, so bypass the default handler
    }
    // return false to use the default handle r
    return false;
}

//device orientation
//set orientation to landscape left
target.setDeviceOrientation(UIA_DEVICE_ORIENTATION_LANDSCAPELEFT);
UIALogger.logMessage("Current orientation now " + app.interfaceOrientation());
//reset orientation to portrait
target.setDeviceOrientation(UIA_DEVICE_ORIENTATION_PORTRAIT);
UIALogger.logMessage("Current orientation now " + app.interfaceOrientation());


//multitasks
//相当于按了home键后10秒钟返回app
target.deactivateAppForDuration(10);


//Launching local script
//Finally, you can launch any scripts (not only Javascript) that is on your local host. Combined with the capacity to take screenshots, you can imagine powerful automatic tests. You can use performTaskWithPathArgumentsTimeout(path, args, timeout)with path containing the full path of your script, args an array of arguments to pass to your script, and timeout a … timeout!
var target = UIATarget.localTarget();
var host = target.host();
var result = host.performTaskWithPathArgumentsTimeout("/usr/bin/echo", ["Hello World"], 5);

//use commandline to run instruments
//instruments -w 46151ed317d4e90db1779560acf8213b1420c362 -t /Applications/Xcode.app/Contents/Applications/Instruments.app/Contents/PlugIns/AutomationInstrument.bundle/Contents/Resources/Automation.tracetemplate TheElements -e UIASCRIPT /Users/test/workspace/autoTestExamples/uiAutomationTest/testTheElements.js
instruments -w UDID -t /Applications/Xcode.app/Contents/Applications/Instruments.app/Contents/PlugIns/AutomationInstrument.bundle/Contents/Resources/Automation.tracetemplate PRODUCT_NAME -e UIASCRIPT absoulute_path_to_the_script

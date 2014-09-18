/**
 * Created by farmx009 on 9/16/14.
 */
angular.module('GPAcalculator', ['ui.bootstrap']);
function GPAcalculatorCTRL ($scope) {
    //Data for Classes including: data, classes, possibleGrades, possibleCredits
    $scope.data = {grade:'A',credits:1};

    $scope.classes = [
    ];

    $scope.possibleGrades = ['A', 'A-', 'B+','B','B-','C+','C','C-','D','D-','F'];
    $scope.gradeEquivalent = [4.0,3.667,3.333,3.0,2.667,2.333,2.0,1.667,1.333,1.0,0.0];
    $scope.possibleCredits = [1,2,3,4,5];

    //Alert section including: alerts, addAlert, closeAlert
    $scope.alerts = [];

    $scope.addAlert = function(msg) {
        if ($scope.alerts.length < 10) {
            $scope.alerts.push({type: 'danger', msg: msg});
        } else {
            console.log('Too many alerts! Not gonna add any new ones!');
        }
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index,1);
    };

    //Main functions including: addClass, deleteClass, editClass
    $scope.addClass = function () {
        if ($scope.data.grade == '' || $scope.data.credits == 0) {
            console.log('invalid input, not creating class!');
            $scope.addAlert('Need selected grade and credit.');
        }
        else {
            console.log('creating new class, grade: ' + $scope.data.grade + ' credits: ' + $scope.data.credits);
            $scope.classes.push({grade: $scope.data.grade, credits: parseInt($scope.data.credits)});
            //console.log($scope.classes);
        }
        $scope.data = {grade:'A', credits: 1};
    };

    $scope.deleteClass = function (index) {
        $scope.classes.splice(index,1);
    };

    $scope.GPAcalc = function () {
        var totalPoints = 0;
        var totalCredits = 0;

        for(var i=0; i<$scope.classes.length ;i++) {
            totalPoints += $scope.gradeEquivalent[$scope.possibleGrades.indexOf($scope.classes[i].grade)] * $scope.classes[i].credits;
            totalCredits += $scope.classes[i].credits;
//            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
//            console.log('classes.length: ' + $scope.classes.length);
//            console.log('classes ' + $scope.classes[i].grade);
//            console.log('Index of possibleGrades: ' + $scope.possibleGrades.indexOf($scope.classes[i].grade));
//            console.log('gradeEquivalent: ' + $scope.gradeEquivalent[$scope.possibleGrades.indexOf($scope.classes[i].grade)]);
//            console.log('classes[i].credits ' + $scope.classes[i].credits);
        }

        if(totalCredits != 0){
           // console.log('GPA calc ' + totalPoints);
//          console.log('Total credits: ' + totalCredits);
            return totalPoints / totalCredits;
        } else {
            return 'You need to have at least 1 credit of classes!';
        }
    };


        $scope.test = function () {
            var failed = 0;
            var passed = 0;
            // Test classes empty by default
            if($scope.classes.length != 0) {
                failed++;
                console.log('ERR: Classes not empty by default')
            } else {passed++;}

            // Test addClass with default values
            $scope.addClass();
            if($scope.classes.length != 1) {
                failed++;
                console.log('ERR: addClass did not add to Classes')
            } else {passed++;}

            // Test addClass with non default values
            $scope.data.credits = 4;
            $scope.data.grade = 'C';   // grade equiv. = 2.0
            $scope.addClass();
            if($scope.classes.length != 2) {
                failed++;
                console.log('ERR: addClass failed to add non default values');
            } else {passed++;}

            // Test GPAcalc with default and non default values.
            if($scope.GPAcalc() != 12/5) {
                failed++;
                console.log('ERR: GPAcalc failed to achieve correct result');
                console.log("expected: 12/5, got: " + $scope.GPAcalc());
            } else {passed++;}

            // Test deleteClass with first class
            // This only tests that a class was deleted, not that a specific class was deleted.
            $scope.deleteClass(0);
            if($scope.classes.length != 1) {
                failed++;
                console.log('ERR: deleteClass failed to delete a class');
            } else {passed++;}

            // Test GPAcalc after deleteClass
            if($scope.GPAcalc() != 2) {
                failed++;
                console.log('ERR: GPAcalc failed after deletion of a class');
                console.log("expected: 2, got: " + $scope.GPAcalc());
            } else {passed++;}

            if(failed != 0) {
                console.log('Tests Passed: ' + passed);
                console.log('Tests Failed: ' + failed);
            } else {
                console.log('All ' + passed + ' tests passed!');
            }

            $scope.classes = [];

        };
}
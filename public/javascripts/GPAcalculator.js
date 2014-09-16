/**
 * Created by farmx009 on 9/16/14.
 */
angular.module('GPAcalculator', ['ui.bootstrap']);
function GPAcalculatorCTRL ($scope) {
    //Data for Classes including: data, classes, possibleGrades, possibleCredits
    $scope.data = {grade: 'A', credits: 1};

    $scope.classes = [
        {grade: 'A+', credits: 5},
        {grade: 'B-', credits: 2}
    ];

    $scope.possibleGrades =['A', 'A-','B+', 'B', 'B-','C+', 'C', 'C-','D+', 'D', 'F'];
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
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index,1);
    }

    //Main functions including: addClass, deleteClass, editClass
    $scope.addClass = function () {
        if ($scope.data.grade == '' || $scope.data.credits == 0) {
            console.log('invalid input, not creating class!');
            $scope.addAlert('Need selected grade and credit.');
        }
        else {
            console.log('creating new class, grade: ' + $scope.data.grade + ' credits: ' + $scope.data.credits);
            $scope.classes.push({grade: $scope.data.grade, credits: $scope.data.credits});
        }
        $scope.data = {grade: 'A', credits: 1};
    };

    $scope.deleteClass = function (index) {
        $scope.classes.splice(index,1);
    };

    $scope.GPAcalc = function () {
        var total = 0;

        for(i=0; i<$scope.classes.length ;i++) {
            total = total +  $scope.gradeEquivalent[$scope.possibleGrades.indexOf($scope.classes[i].grade)] * $scope.classes[i].credits;

            console.log('classes.length: ' + $scope.classes.length);
            console.log('classes ' + $scope.classes[i].grade);
            console.log('possibleGrades: ' + $scope.possibleGrades.indexOf($scope.classes[i].grade));
            console.log('gradeEquivalent: ' + $scope.gradeEquivalent[$scope.possibleGrades.indexOf($scope.classes[i].grade)]);
            console.log('classes[i].credits ' + $scope.classes[i].credits);
        }
        console.log('GPA calc ' + total);
        return total / $scope.classes.length;
    }

    $scope.editClass = function () {

    };
}
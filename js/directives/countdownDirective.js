app.directive("countdown", function () {

    return {
        restrict: "EAC",
        scope: {
            setDate: "@",
            expireMessage: "@",
            formatView: "@"
        },
        replace: true,
        template: "<div><div></div></div>",
        link: function (scope, element) {

            scope.insertDate = function() {
                scope.setMessageExpired(scope.expireMessage);
                scope.setDateFinal(scope.setDate);
                scope.start();
            };

            scope.$watch('setDate', function() {
                scope.insertDate();
            }, true);

            var end = new Date();
            var _second = 1000;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;

            var params = {
                second:_second,
                minute:_minute,
                hour: _hour,
                day: _day,
                interval: null,
                messageFinal: 'expired!',
                format:'Y-m-d H:i:s',
                dateEnd: null
            };

            scope.setMessageExpired = function(message) {
                params.messageFinal = message;
            };

            scope.setId = function(id) {
                params.id = id;
                scope.viewElement.setAttribute("id", id);
            };

            scope.setDateFinal = function(dateVal) {
                params.dateEnd = dateVal;
            };

            var createDateFinal = function(strDate) {

                var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
                var dateArray = reggie.exec(strDate);
                return new Date(
                    (+dateArray[1]),
                    (+dateArray[2])-1, // Careful, month starts at 0!
                    (+dateArray[3]),
                    (+dateArray[4]),
                    (+dateArray[5]),
                    (+dateArray[6])
                );

            };


            scope.remaining = function() {
                var now = new Date();

                end = createDateFinal(params.dateEnd);

                var distance = end - now;

                if (distance < 0) {
                    clearInterval(params.interval);
                    //scope.viewElement.view = params.messageFinal;
                    element[0].innerHTML = params.messageFinal;
                    return;
                }
                var days = Math.floor(distance / params.day);
                var hours = Math.floor((distance % params.day) / params.hour);
                var minutes = Math.floor((distance % params.hour) / params.minute);
                var seconds = Math.floor((distance % params.minute) / params.second);
                var elementsTime = [];
                elementsTime[0] =((days < 10) ? '0' : '') + days;
                elementsTime[1] =((hours < 10) ? '0' : '') + hours;
                elementsTime[2] =((minutes < 10) ? '0' : '') + minutes;
                elementsTime[3] =((seconds < 10) ? '0' : '') + seconds;
                element[0].innerHTML =  scope.setFormatViewTime(elementsTime);

            };

            scope.setFormatViewTime = function(elementsTime) {
                return scope.formatView
                    .replace(/%d/gi, elementsTime[0])
                    .replace(/%h/gi, elementsTime[1])
                    .replace(/%i/gi, elementsTime[2])
                    .replace(/%s/gi, elementsTime[3]);
            };

            scope.setFormatDate = function(format) {
                params.format = format;
            };

            scope.start = function () {
                if (!(end instanceof Date) || isNaN(end.valueOf()) ) {
                    console.log('A data final não foi definida, adicione uma data conforme o exemplo: yyyy-mm-dd hh:mm:ss!');
                    return false;
                }
                params.interval = setInterval(this.remaining, params.second);
            };

        }

    };
});
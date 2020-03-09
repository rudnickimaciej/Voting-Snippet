var defaultBtn = "btn-light";
var greenBtn = "btn-success";
var redBtn = "btn-danger";

$(document).ready(function () {

    $(".btn-vote").click(function () {

        //result object data that will be put in Json
        var answerId = $(this).attr("answer_id");
        var value;


        //Button references (two variables will to one of the buttons depending on which button was clicked)
        var clickedBtn = $(this);
        var negBtn = $("btn.btn-vote.negativeVote[answer_id='" + answerId + "']")
        var posBtn = $("btn.btn-vote.positiveVote[answer_id='" + answerId + "']")
        var pointsView = $("btn.btn-points[answer_id='" + answerId + "']")


        //Clicked attributes

        var clickedAttr = clickedBtn.attr("clicked");
        var posBtnClickedAttr = posBtn.attr("clicked");
        var negBtnClickedAttr = negBtn.attr("clicked");


        var pointsOnSide = pointsView.attr("points");



        if (clickedBtn.hasClass("positiveVote")) {
            var points;

            if (typeof clickedAttr !== typeof undefined && clickedAttr !== false) {

                //Positive btn is already clicked. Herem we click it again so we unclick it by changing colour to default and decrementing points value

                clickedBtn.removeAttr("clicked"); //change 'clicked' flag

                clickedBtn.removeClass(greenBtn) //change colour to defaults
                clickedBtn.addClass(defaultBtn);
                var points = parseInt(pointsOnSide) - 1;
                pointsView.text(points); //change points
                pointsView.attr("points", points);

                value = 0;

            }
            else {

                //Positive btn was not clicked before. Here we click it by changing colour to green and incrementing points;

                clickedBtn.attr("clicked", '') //change 'clicked' flag

                clickedBtn.addClass(greenBtn); //change colour to green
                clickedBtn.removeClass(defaultBtn);

                points = parseInt(pointsOnSide) + 1;
                pointsView.text(points); //change points
                pointsView.attr("points", points);


                value = 1;

                if (typeof negBtnClickedAttr !== typeof undefined && negBtnClickedAttr !== false) {

                    //While clicking positive btn, there might be the case that negative button was already clicked. If so, we need to change it to default colour and remove 'clicked' flag

                    negBtn.removeClass(redBtn);
                    negBtn.addClass(defaultBtn);

                    points += 1;
                    negBtn.removeAttr('clicked');
                }

                pointsView.text(points); //change points
                pointsView.attr("points", points);
            }
        }
        else if (clickedBtn.hasClass("negativeVote")) {

            var points;
            if (typeof clickedAttr !== typeof undefined && clickedAttr !== false) {

                //Negativce btn is already clicked. Here we click it again so we unclick it by changing colour to default and incrementing points value

                clickedBtn.removeClass(redBtn); //change colour to defaults
                clickedBtn.addClass(defaultBtn);

                points = parseInt(pointsOnSide) + 1;

                pointsView.text(points); //change points
                pointsView.attr("points", points);

                clickedBtn.removeAttr("clicked");  //remove 'clicked' flag
                value = 0;

            }

            else {

                //Negativce btn was not clicked before. Here we click it by changing colour to red and decrement points;
                clickedBtn.addClass(redBtn);  //change colour to red
                clickedBtn.removeClass(defaultBtn);
                clickedBtn.attr("clicked", '')
                points = parseInt(pointsOnSide) - 1;



                //While clicking negativce btn, there might be the case that positive button was already clicked. If so, we need to change it to default colour and remove 'clicked' flag

                if (typeof posBtnClickedAttr !== typeof undefined && posBtnClickedAttr !== false) {

                    posBtn.removeClass(greenBtn); //change positive button colour to default
                    posBtn.addClass(defaultBtn);

                    points = - 1;
                    posBtn.removeAttr('clicked'); //remove 'clicked' flag from positive button

                }

                pointsView.text(points); //change points
                pointsView.attr("points", points);
                value = -1;

            }
        }


        $.ajax({
            type: "POST",
            url: 'your_url',
            data: {
                value: value,
                user_id: "user_id_that_vote",
                answer_id: answerId
                //access_token: $("#access_token").val()
            },
            beforeSend: function (data) {
                console.log(data);
                console.log(value);
                console.log("Active user id: ");
                console.log(data["user_id"]);
                console.log(data["answer_id"]);
            },

            success: function (result) {

                // Your logic

            },
            error: function (jqxhr, status, exception) {
                console.log('Exception:', exception);
            }

        });

    });
});
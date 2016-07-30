var images = [
    {
        "title": "Introduction to Algorithms",
        "url": "../img/Clrs3.jpeg"
    },
    {
        "title": "The C Programming Language",
        "url": "../img/cprogramming.png"
    },
    {
        "title": "The Linux Programming Interface",
        "url": "../img/linux.png"
    },
    {
        "title": "Web Programming Step by Step",
        "url": "../img/webprogramming.jpg"
    },
    {
        "title": "Learning Web App Development",
        "url": "../img/webappdevelopment.jpg"
    }
];

$(document).ready(function() {

    $('section').hide();
    $('#home').show();

    $(window).resize(function()
    {
       if ($(window).width() >= 768) {
            stickyNav();

            $(window).scroll(function() {
                stickyNav();
            });
        }
    });
    slider();

});

function slider() {

    // Init
    var $gallery = $("#gallery");
    var $slider = $('<ul/>');
    var leftOffset = 0;

    // Append each item
    $.each( images, function(index, item) {
        // Add offset for next item
        if ( index == 1 ) leftOffset += 250;
        // Create new tags
        var $li = $('<li/>', {
            css: {left: leftOffset}
        });
        var $img = $('<img/>', {
            src: images[index].url,
            alt: images[index].title,
            height: "100%",
            width:"62%"
        });
        // Append
        $li.append($img);
        $li.appendTo($slider);
        // Add offset
        leftOffset += 250;
    });
    $gallery.append($slider);

    // Make first image bigger than others

    $("div#gallery ul li:first-child").css("width", "500px");
    // Calculate step size
    // var step_size = 100 / (images.length - 1);
    // Create slide controller
    var $controller = $('<div/>', {
        id: "controller"
    });
    $slider.append($controller);

    window.slider_index = 0;
    window.slide_direction = "right";
    slide();
    $("div#gallery").append($controller);
}

function slide() {

    if (slider_index == images.length - 1) slide_direction = "left";
    else if (slider_index == 0) slide_direction = "right";
    if (slide_direction == "right") slider_index ++;
    else if (slide_direction == "left") slider_index --;

    // Get showcase (image at slider_index)
    var $showcase = $("div#gallery ul li").eq(slider_index);
    // Get images before and after showcase.
    var before = $showcase.prevAll();
    var after = $showcase.nextAll();
    // Animate showcase
    $showcase.animate({
        left: "0px",
        width: "500px"
    });
    // Config all images before showcase
    $showcase.prevAll().each(function(index) {
        // prevAll() returns elements starting with the closest sibling
        $(this).animate({
            left: - 250 - index * 250 ,
            width: 250
        }, { duration: 200, queue: true });
    });
    /// Config all images after showcase
    $showcase.nextAll().each(function(index) {
        $(this).animate({
            left: + 500 + index * 250,
            width: 250
        }, { duration: 200, queue: true });
    });
    setTimeout(slide, 2000);
}

$('#btn-home').click(function() {
    $('section').hide();
    $('#home').show();
    $('#profile').show();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-books').click(function() {
    $('section').hide();
    $('#search-books').show();
    $('#profile').show();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-courses').click(function() {
    $('section').hide();
    $('#search-courses').show();
    $('#profile').show();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-feedback').click(function() {
    $('section').hide();
    $('#feedback').show();
    $('#profile').show();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-contact').click(function() {
    $('section').hide();
    $('#contact').show();
    $('#profile').show();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-signup').click(function() {
    $('section').hide();
    $('#profile').hide();
    $('#signup').show();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-add').click(function() {
    removeLoggedInSection();
    $('section').hide();
    getAddingForms();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-changeUser').click(function() {
    removeLoggedInSection();
    $('section').hide();
    displayUsers();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-profile').click(function() {
    removeLoggedInSection();
    $('section').hide();
    getProfile();
    $('.errmsg').remove();
    $('.msg').remove();
});

$('#btn-message').click(function() {
    removeLoggedInSection();
    $('section').hide();
    $('.errmsg').remove();
    $('.msg').remove();
    getMessage();

});

$('#btn-send').click(function() {
    removeLoggedInSection();
    $('section').hide();
    $('.errmsg').remove();
    $('.msg').remove();
    sendMessage();
});

$('#btn-follow').click(function() {
    removeLoggedInSection();
    $('section').hide();
    $('.errmsg').remove();
    $('.msg').remove();
    followFriend();
});

$('#btn-follows').click(function() {
    removeLoggedInSection();
    $('section').hide();
    $('.errmsg').remove();
    $('.msg').remove();
    getFollows();
});


$('#btn-veiwFeedback').click(function() {
    removeLoggedInSection();
    $('section').hide();
    $('.errmsg').remove();
    $('.msg').remove();
    getFeedbacklist();
});

$('nav#navbar').click(function() {
    $('#container').remove();
});

$('#search-course').click(function(event) {
    event.preventDefault();
    removeLoggedInSection();
    $('section').hide();
    $('.errmsg').remove();
    $('.msg').remove();
    getCourse();
});

$('#search-book').click(function(event) {
    event.preventDefault();
    removeLoggedInSection();
    $('section').hide();
    $('.errmsg').remove();
    $('.msg').remove();
    getBooks();
});



function stickyNav(){
    var navPosition = $('#navbar').position();
    var scrollTop = $(window).scrollTop();

    if (scrollTop > navPosition.top) {
        $('#navbar').addClass('sticky');
    } else {
        $('#navbar').removeClass('sticky');
    }
};

function getProfile() {
    $.ajax(
    {
        url: "profile",
        method: "GET",
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
                var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
                var $title1 = $("<h2>", {id: "info"});
                $title1.text("User Imformation: ");
                var $title2 = $("<h2>", {id: "offercourse"});
                $title2.text("Offer Course: ");
                var $title3 = $("<h2>", {id: "offerBook"});
                $title3.text("Offer Book: ");
                var $paragraph1 = $("<p>", {id: "profileparagraph"});
                var $linebreak = $("<br>");
                $container.append($title1);

                var $form = $("<form>", {id: "infoform", action: "/changeInfo", method: "post"});
                var $email = $("<label>");
                $email.text("Email: ");
                var $email_input = $("<input>", {name: "user_email", value: checkNull(data[0][0].email), readonly: "readonly"});
                $email.append($email_input);
                $form.append($email);
                $form.append("<br>");
                var $password = $("<label>");
                $password.text("Password: ");
                var $password_input = $("<input>", {name: "user_password",
                                                    type: "password",
                                                    placeholder: "If change password please enter otherwise blank"});
                $password.append($password_input);
                $form.append($password);
                $form.append("<br>")

                var $birthday = $("<label>");
                $birthday.text("Birthday: ");
                var $birthday_input = $("<input>", {name: "user_birthday", value: checkNull(data[0][0].birthday)});
                $birthday.append($birthday_input);
                $form.append($birthday);
                $form.append("<br>")

                var $phone = $("<label>");
                $phone.text("Phone: ");
                var $phone_input = $("<input>", {name: "user_phone",
                                                 value: checkNull(data[0][0].phone),
                                                 placeholder: "Phone: 10 numbers"});
                $phone.append($phone_input);
                $form.append($phone);
                $form.append("<br>")

                var $year_of_study = $("<label>");
                $year_of_study.text("Year of Study: ");
                var $year_of_study_input = $("<input>", {name: "user_year_of_study",
                        type: "number",
                        value: checkNull(data[0][0].year_of_study),
                            placeholder: "major"});
                $year_of_study.append($year_of_study_input);
                $form.append($year_of_study);
                $form.append("<br>")

                var $major = $("<label>");
                $major.text("Major: ");
                var $major_input = $("<input>", {name: "user_major",
                                                 value: checkNull(data[0][0].major),
                                                 pattern: "[0-9A-Za-z]{3}[0-9A-Za-z]*",
                                                 placeholder: "major(at least 3 characher)"});
                $major.append($major_input);
                $form.append($major);
                $form.append("<br>")

                var $button = $("<button>", {type: "submit"}).text("Save Information");
                $form.append($button);


                $paragraph1.append($form);

                $container.append($paragraph1);
                $container.append("<hr>");

                $container.append($title2);
                if (data.length > 1) {
                    var $paragraph2 = $("<p>", {id: "profileparagraph"});
                    for (var i = 0; i < data[1].length; i++) {
                        $paragraph2.append("Course: " + checkNull(data[1][i].title) + "<br>" +
                                            "Section: " + checkNull(data[1][i].sect) + "<br>" +
                                            "Department: " + checkNull(data[1][i].dept) + "<br>" +
                                            "Code: " + checkNull(data[1][i].num));
                        $paragraph2.append("<hr>");
                    }
                    $container.append($paragraph2);
                }
                $container.append("<hr>");
                $container.append($title3);
                if (data.length > 2) {
                    var $paragraph3 = $("<p>", {id: "profileparagraph"});
                    for (var j = 0; j < data[2].length; j++) {
                        $paragraph3.append("Title: " + checkNull(data[2][j].title) + "<br>" +
                                            "Author: " + checkNull(data[2][j].author) + "<br>" +
                                            "Publisher: " + checkNull(data[2][j].publisher) + "<br>"
                                            );
                        $paragraph3.append("<hr>");
                    }
                    $container.append($paragraph3);
                }
                $container.append("<hr>");
                $container.insertBefore($("footer"));

            } else {
                var $paragraph =  $("<p></p>", {id: "404"});
                $paragraph.text("404 Not Found!")
                $('body').append($paragraph);
            }
        }
    });
}


function getAddingForms() {
    var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
    var $title1 = $("<h2>", {class: "sectiontitle"});
    var $title2 = $("<h2>", {class: "sectiontitle"});
    $title1.text("Add Offer Books");
    $title2.text("Add Offer Courses");
    var $bookform = $("#searchBookForm").clone().prop("id", "addBookForm");
    var $courseform = $("#searchCourseForm").clone().prop("id", "addCourseForm");
    $bookform.attr("action","add_book");
    $bookform.attr("method","post");
    $courseform.attr("action", "add_course");
    $courseform.attr("method","post");
    $bookform.find("#search-book").text("Add Book!");
    $courseform.find("#search-course").text("Add Course!");
    $courseTitle = $("<input>", {
        id: "course-title",
        type: "text",
        name: "course_title",
        placeholder: "Course Title"});
    $courseTitleLabel = $("<label>", {
        text: "Course Title: "
    });
    $courseTitle.appendTo($courseTitleLabel);
    $courseTitleLabel.append("<br>");
    $courseTitleLabel.insertBefore($($courseform.find("#section")).parent());
    $container.append($title1);
    $container.append($bookform);
    $container.append("<hr>");
    $container.append($title2);
    $container.append($courseform);
    $container.insertBefore($("footer"));


}

function getFollows() {
    $.ajax({
        url: "follows",
        method: "POST",
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
                console.log(JSON.stringify(data));
                var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
                var $title = $("<h2>", {class: "sectiontitle"});
                var $following_list = $("<ul>", {id: "following_list"});
                $title.text("Following");
                $container.append($title);
                for (var i = 0; i < data[0].length; i++) {
                    var $following_user = $("<li>", {class: "following_user"});
                    $following_user.text(data[0][i].user2);
                    $following_list.append($following_user);
                }
                $container.append($following_list);
                $container.append("<hr>");
                var $title = $("<h2>", {class: "sectiontitle", text: "Followers"});
                $container.append($title);
                var $follower_list = $("<ul>", {id: "follower_list"});
                for (var i = 0; i < data[1].length; i++) {
                    var $follower_user = $("<li>", {class: "follower_user"});
                    $follower_user.text(data[1][i].user1);
                    $follower_list.append($follower_user);
                }
                $container.append($follower_list);
                $container.insertBefore($("footer"));

            } else {
                var $paragraph =  $("<p></p>", {id: "404"});
                $paragraph.text("404 Not Found!")
                $('body').append($paragraph);
            }
        }
    });
}

function getMessage() {
    $.ajax(
    {
        url: "message",
        method: "POST",
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
                data[0].sort(function (obj1, obj2) {
                    var date1 = new Date(obj1.time);
                    var date2 = new Date(obj2.time);
                    if (date1.getTime() > date2.getTime()) {
                        return -1;
                    }
                    if (date1.getTime() < date2.getTime()) {
                        return 1;
                    }
                    return 0;
                });
                var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
                var $title = $("<h2>", {class: "sectiontitle"});
                $title.text("My Message");
                $container.append($title);
                console.log(JSON.stringify(data));
                for (var i = 0; i < data[0].length; i++) {
                    var date = new Date(data[0][i].time);
                    var $msgwindows = $("<p>", {class: "msgwindows"});
                    var $sender = $("<h3>", {class: "sender"});
                    var $time = $("<h4>", {class: "sendtime"});
                    var $msg = $("<h4>", {class: "message"});
                    $sender.text("From: " + data[0][i].user1);
                    $time.text("Time: " + date.toLocaleString());
                    $msg.text("Text: " + data[0][i].message);
                    $msgwindows.append($sender);
                    $msgwindows.append($time);
                    $msgwindows.append($msg);
                    $msgwindows.append("<br>");
                    $container.append($msgwindows);
                    $container.append("<hr>");
                }
                $container.insertBefore($("footer"));

            } else {
                var $paragraph =  $("<p></p>", {id: "404"});
                $paragraph.text("404 Not Found!")
                $('body').append($paragraph);
            }
        }
    });
}

function sendMessage() {
    var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
    var $title = $("<h2>", {class: "sectiontitle"});
    $title.text("Send Message");
    var $lable = $("<lable>", {class: "label"});
    var $receiver = $("<input>", {name: "receiver", id: "receiver", placeholder: "receiver"});
    var $textbox = $("<textarea>", {name: "mymessage", row: "15", cols: "79", id: "msgbox"});
    var $button = $("<button>", {type: "submit", id: "submitmsg"});
    var $form = $("<form>", {action: "/sendmsg", method: "post"});
    $button.text("Send");
    $lable.text("Receiver: ");
    $form.append($lable);
    $form.append($receiver);
    $form.append($textbox);
    $form.append($button);
    $container.append($title);
    $container.append($form);
    $container.insertBefore($("footer"));
}

function followFriend() {
    var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
    var $title = $("<h2>", {class: "sectiontitle"});
    $title.text("Follow Friend");
    var $lable = $("<lable>", {class: "label"});
    var $receiver = $("<input>", {name: "friend", id: "receiver", placeholder: "Email"});
    var $button = $("<button>", {type: "submit", id: "submitmsg"});
    var $form = $("<form>", {action: "/follow", method: "post"});
    var $info = $("<button>", {
        text: "Find User",
        id: "getUserProfile"});


    $button.text("Follow!");
    $lable.text("Target Email: ");
    $form.append($lable);
    $form.append($receiver);
    $form.append("<br>");
    $form.append($button);
    $container.append($title);
    $container.append($form);
    $container.append($info);
    $container.insertBefore($("footer"));

    $info.click(function() {
        $.ajax({
            url: "get_user_profile",
            method: "POST",
            dataType: "json",
            data: {
                email: $receiver.val()
            },
            success: function(data) {
                $('#userInformation').remove();
                $userArticle = $("<article>", {
                    id: "userInformation"
                });
                $userArticle.append("<hr>");
                if (data[0].length) {
                    var $user = $("<h3>", {
                        text: data[0][0].email
                    });
                    var $phone = $("<h4>", {
                        text: "Phone: " + checkNull(data[0][0].phone)
                    });
                    var $studyYear = $("<p>", {
                        text: "Year of Study: " + checkNull(data[0][0].year_of_study)
                    });
                    var $major = $("<p>", {
                        text: "Major: " + checkNull(data[0][0].major)
                    });
                    $userArticle.append($user);
                    $userArticle.append($phone);
                    $userArticle.append($studyYear);
                    $userArticle.append($major);
                    $userArticle.append("<br>");

                    $books = $("<h3>", {
                        text: "Offer Books"
                    });
                    $userArticle.append($books);
                    $book_info = $("<p>");
                    for (var j = 0; j < data[2].length; j++) {
                        $book_info.append("Title: " + checkNull(data[2][j].title) + "<br>" +
                                            "Author: " + checkNull(data[2][j].author) + "<br>" +
                                            "Publisher: " + checkNull(data[2][j].publisher) + "<br>"
                                            );
                        $book_info.append("<hr>");
                    }
                    $userArticle.append($book_info);

                    $courses = $("<h3>", {
                        text: "Offer Books"
                    });
                    $userArticle.append($courses);
                    // $container.append("<br>");
                    $course_info = $("<p>");
                    for (var i = 0; i < data[1].length; i++) {
                        $course_info.append("Course: " + checkNull(data[1][i].title) + "<br>" +
                                            "Section: " + checkNull(data[1][i].sect) + "<br>" +
                                            "Department: " + checkNull(data[1][i].dept) + "<br>" +
                                            "Code: " + checkNull(data[1][i].num));
                        $course_info.append("<hr>");
                    }
                    $userArticle.append($course_info);
                } else {
                    $userArticle.append($("<p>", {
                        text: "No user under this ID was found!"
                    }));
                }
                $userArticle.appendTo($container);
            }
        });
    });
}

function getCourse() {

    $.ajax({
        url: "search_courses",
        method: "POST",
        dataType: "json",
        data: {
            department: $("#department").val(),
            code: $("#code").val(),
            section: $("#section").val()
        },
        success: function(data) {
            var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
            var $title = $("<h2>", {class: "sectiontitle", text: "Offering Courses"});
            $container.append($title);
            if (data[0].length > 0) {
                console.log(data);
                for (var i = 0; i < data[0].length; i++) {
                    $course_code = $("<h3>", {
                        class: "queries",
                        text: data[0][i].dept.toUpperCase() + data[0][i].num
                    }).addClass("query_course_" + i);

                    $course_title = $("<h4>", {
                        class: "queries",
                        text: "Course Title: " + checkNull(data[0][i].title)
                    });
                    $lecture_section = $("<h4>", {
                        class: "queries",
                        text: "Lecture Section: " + checkNull(data[0][i].sect)
                    });

                    $contact_info = $("<p>", {
                        class: "queries",
                        text: "Contact Information: " + data[0][i].email
                    }).addClass("query_contact_" + i);

                    $container.append($course_code);
                    $container.append($course_title);
                    $container.append($lecture_section);
                    $container.append($contact_info);
                    if ($("#alreadySignedIn").length > 0) {
                        $comment = $("<button>", {
                            text: "Comment",
                            class: "btn-comment",
                            id: "btn-comment_" + i
                        });
                        $container.append($comment);
                    }
                    $container.append("<hr>");

                }
            } else {
                    $no_result = $("<p>", {
                        text: "Sorry! Nothing was found. Please try a different query"
                    });
                    $container.append($no_result);
                    $container.append("<hr>");
            }

            var $title = $("<h2>", {class: "sectiontitle", text: "Recommendations"});
            $container.append($title);
            if (data[1].length > 0) {
                for (var i = 0; i < data[1].length; i++) {
                    $book_title = $("<h3>", {
                        class: "queries",
                        text: data[1][i].title});

                    $book_author = $("<h4>", {
                        class: "queries",
                        text: "By: " + data[1][i].author
                    });

                    $book_publisher = $("<h5>", {
                        class: "queries",
                        text: "Publisher: " + checkNull(data[1][i].publisher)
                    });

                    $contact_info = $("<p>", {
                        class: "queries",
                        text: "Contact Information: " + data[1][i].email
                    });

                    $container.append($book_title);
                    $container.append($book_author);
                    $container.append($book_publisher);
                    $container.append($contact_info);
                    $container.append("<hr>");
                }
            } else {
                $no_result = $("<p>", {
                        text: "Please provide more information to optimize your experience."
                });
                $container.append($no_result);
                $container.append("<hr>");
            }
            $container.insertBefore($("footer"));
        },
    });

}

function get_book_comment(email, title, author) {

    $.ajax({
        url: "get_book_comment",
        method: "POST",
        dataType: "json",
        data: {
            email: $("#" + email).text(),
            title: $("#" + title).text(),
            author: $("#" + author).text()
        },
        success: function(data) {
            var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
            var $title = $("<h2>", {class: "sectiontitle", text: "Comments"});
            $container.append($title);
            console.log(data)
            if (!data.email){
                for (var i = 0; i < data.length; i++) {
                    var $from = $("<h3>", {
                        text: "From :" + data[i].user
                    });

                    var $time = $("<h4>", {
                        text: "Time: " + data[i].time
                    });

                    var $comment = $("<p>", {
                        text: "Comment: " + checkNull(data[i].comments)
                    });
                    $container.append($from);
                    $container.append($time);
                    $container.append($comment);
                    $container.append("<hr>");
                }
            } else {
                $no_comment = $("<p>", {
                    text: "Be the first one to comment!"
                });
                $container.append($no_comment);
            }

            var $comment_area = $("<textarea>", {
                rows: "10",
                column: "79",
                name: "comment_book"
            });

            var $comment_button = $("<button>", {
                text: "Submit!",
                id: "submit-comment"
            });

            var $comment_form = $("<form>", {
                id: "user_comment"
            });

            $comment_form.click(function() {
                var email, bookTitle, bookAuthor;
                if (!data.email) {
                    email = data[0].email,
                    bookTitle = data[0].title,
                    bookAuthor = data[0].author
                } else {
                    email = data.email,
                    bookTitle = data.title,
                    bookAuthor = data.author
                }
                var $userComment = $comment_area.val();

                postBookComment(email,bookTitle, bookAuthor, $userComment);

            });

            $comment_form.append($comment_area);
            $comment_form.append($comment_button);
            $container.append($comment_form);
            $container.insertBefore($("footer"));

        }
    });
}

function postBookComment(email, title, author, comment) {
    $.ajax({
        url: "post_book_comment",
        method: "POST",
        dataType: "json",
        data: {
            email: email,
            title: title,
            author: author,
            comment: comment
        },
        success: function() {
            removeLoggedInSection();
            $('section').hide();
            $('.errmsg').remove();
            $('.msg').remove();
        }
    });
}

function like(email, title, author) {
    $.ajax({
        url: "like",
        method: "POST",
        dataType: "json",
        data: {
            email: $("#" + email).text(),
            title: $("#" + title).text(),
            author: $("#" + author).text()
        },
        success: function(data) {
            var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
            var $title = $("<h2>", {class: "sectiontitle", text: "Likes (" + data.length +")"});
            $container.append($title);
            var $user_list = $("<ul>", {
                id: "liked_users"
            });
            for (var i = 0; i < data.length; i++) {
                var $user = $("<li>", {
                    text: data[i].user,
                    class: "liked_user"
                });
                $user_list.append($user);
            }
            $container.append($user_list);
            $container.insertBefore($("footer"));
        }
    });
}

function getBooks() {
    $.ajax({
        url: "search_books",
        method: "POST",
        dataType: "json",
        data: {
            title: $("#book_title").val(),
            author: $("#author").val(),
            publisher: $("#publisher").val(),
            dept: $("#dept").val(),
            num: $("#num").val()
        },
        success: function(data) {
            var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
            var $title = $("<h2>", {class: "sectiontitle", text: "Offering Books"});
            $container.append($title);
            if (data[0].length > 0) {
                for (var i = 0; i < data[0].length; i++) {
                    $book_title = $("<h3>", {
                        class: "queries",
                        text: data[0][i].title,
                        id: "book_title_" + i
                    });

                    $booka_author = $("<h4>", {
                        class: "queries ",
                        text: "By: " + data[0][i].author,
                        id: "book_author_" + i
                    });

                    $book_publisher = $("<h5>", {
                        class: "queries",
                        text: "Publisher: " + checkNull(data[0][i].publisher)
                    });

                    $contact_info = $("<p>", {
                        class: "queries",
                        text: "Contact Information: " + data[0][i].email,
                        id: "book_contact_" + i
                    });

                    $container.append($book_title);
                    $container.append($booka_author);
                    $container.append($book_publisher);
                    $container.append($contact_info);
                    if ($("#alreadySignedIn").length > 0) {
                        $comment = $("<button>", {
                            text: "Comment",
                            class: "book-comment",
                            id: "btn-book-comment_" + i
                        }).click(function() {
                            var clicked = this.id;
                            var query_num = clicked.substring(clicked.length - 1, clicked.length);
                            var email = "book_contact_" + query_num,
                                bookTitle = "book_title_" + query_num,
                                bookAuthor = "book_author_" + query_num;

                            $('section').hide();
                            $('.errmsg').remove();
                            $('.msg').remove();
                            get_book_comment(email, bookTitle, bookAuthor);
                            removeLoggedInSection();

                        });
                        $like = $("<button>", {
                            text: "Like",
                            id: "btn-like_" + i
                        }).click(function(){
                            var clicked = this.id;
                            var query_num = clicked.substring(clicked.length - 1, clicked.length);
                            var email = "book_contact_" + query_num,
                                bookTitle = "book_title_" + query_num,
                                bookAuthor = "book_author_" + query_num;

                            console.log(email, bookTitle, bookAuthor);


                            $('section').hide();
                            $('.errmsg').remove();
                            $('.msg').remove();
                            like(email, bookTitle, bookAuthor);
                            removeLoggedInSection();
                        });
                        $container.append($like);
                        $container.append($comment);
                    }
                    $container.append("<hr>");
                }
            } else {
                $no_result = $("<p>", {
                    text: "Sorry! Nothing was found. Please try a different query"
                });
                $container.append($no_result);
            }

            var $title = $("<h2>", {class: "sectiontitle", text: "Recommendations"});
            $container.append($title);
            if (data[1].length > 0) {
                for (var i = 0; i < data[1].length; i++) {
                    $course_code = $("<h3>", {
                        class: "queries",
                        text: data[1][i].dept.toUpperCase() + data[1][i].num
                    });

                    $course_title = $("<h4>", {
                        class: "queries",
                        text: "Course Title: " + checkNull(data[1][i].sect)
                    });

                    $lecture_section = $("<h4>", {
                        class: "queries",
                        text: "Lecture Section: " + checkNull(data[1][i].title)
                    });

                    $contact_info = $("<p>", {
                        class: "queries",
                        text: "Contact Information: " + data[1][i].email
                    });

                    $container.append($course_code);
                    $container.append($course_title);
                    $container.append($lecture_section);
                    $container.append($contact_info);
                    $container.append("<hr>");
                }
            } else {
                $no_result = $("<p>", {
                    text: "Please provide more information to optimize your experience."
                });
                $container.append($no_result);
            }
            $container.insertBefore($("footer"));
        }
    });
}

function displayUsers(){
    $.ajax({
        url: "userList",
        method: "POST",
        dataType: "json",
        success: function(data) {
            var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
            var $title = $("<h2>");
            $title.text("User List");
            $container.append($title);
            console.log(data.length);
            console.log(data);
            for (var i=0; i < data.length; i++) {

                var $paragraph = $("<p>", {id: "user_" + (i+1), class: "user"});
                var $button = $("<button>", {id: "" + data[i].email, class: "selectUser"});

                $button.text("More Info");
                $paragraph.text("User " + (i+1) + ": "+ data[i].email);
                $paragraph.append($button);
                $paragraph.css({"border": "solid","border-width" : "1px"});
                $container.append($paragraph);
            }
            $container.insertBefore($("footer"));

            // make the button works
            $(".selectUser").click(function() {
                removeLoggedInSection();
                $('section').hide();
                $('.errmsg').remove();
                $('.msg').remove();
                changeUser(this.id);
            });
        }
    });
}

function removeLoggedInSection() {
    $(".logged-in-menu-item").remove();
}

function changeUser(username) {
    $.ajax({
        url: "userInfo",
        method: "POST",
        dataType: "json",
        data: {
            target: username
        },
        success: function(data) {

            var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
            var $title = $("<h2>", {class: "sectiontitle"});
            $title.text("Change User Information");
            var $form = $("<form>", {id: "infoform", action: "/changeInfo", method: "post"});
            $form.append($title);
            var $email = $("<label>");
            $email.text("Email: ");
            var $email_input = $("<input>", {name: "user_email", value: checkNull(data[0].email), readonly: "readonly"});
            $email.append($email_input);
            $form.append($email);
            $form.append("<br>");

            var $password = $("<label>");
            $password.text("Password: ");
            var $password_input = $("<input>", {name: "user_password"});
            $password.append($password_input);
            $form.append($password);
            $form.append("<br>")

            var $birthday = $("<label>");
            $birthday.text("Birthday: ");
            var $birthday_input = $("<input>", {name: "user_birthday", value: checkNull(data[0].birthday)});
            $birthday.append($birthday_input);
            $form.append($birthday);
            $form.append("<br>")

            var $phone = $("<label>");
            $phone.text("Phone: ");
            var $phone_input = $("<input>", {name: "user_phone", value: checkNull(data[0].phone)});
            $phone.append($phone_input);
            $form.append($phone);
            $form.append("<br>")

            var $year_of_study = $("<label>");
            $year_of_study.text("Year of Study: ");
            var $year_of_study_input = $("<input>", {name: "user_year_of_study", value: checkNull(data[0].year_of_study)});
            $year_of_study.append($year_of_study_input);
            $form.append($year_of_study);
            $form.append("<br>")

            var $major = $("<label>");
            $major.text("Major: ");
            var $major_input = $("<input>", {name: "user_major", value: checkNull(data[0].major)});
            $major.append($major_input);
            $form.append($major);
            $form.append("<br>")

            var $button = $("<button>", {type: "submit"}).text("Save Information");
            $form.append($button);
            $container.append($form);
            $container.insertBefore($("footer"));
        }
    });
}


function getFeedbacklist() {
    $.ajax({
        url: "/getFeedback",
        method: "POST",
        dataType: "json",
        success: function(data) {
            data.sort(function (obj1, obj2) {
                var date1 = new Date(obj1.time);
                var date2 = new Date(obj2.time);
                if (date1.getTime() > date2.getTime()) {
                    return -1;
                }
                if (date1.getTime() < date2.getTime()) {
                    return 1;
                }
                return 0;
            });

            var $container = $("<section>", {id: "container", class: "logged-in-menu-item"});
            var $title = $("<h2>", {class: "sectiontitle", text: "User's Feedbacks"});
            $container.append($title);
            for (var i = 0; i < data.length; i++) {
                var date = new Date(data[i].time);
                $time = $("<h3>", {
                    class: "queries",
                    text: "Submit Time: " + date.toLocaleString()
                });

                $feedback = $("<h4>", {
                    class: "queries",
                    text: "Feedback: " + checkNull(data[i].feedback)
                });

                $container.append($time);
                $container.append($feedback);
                $container.append("<hr>");

            }

            $container.insertBefore($("footer"));
        }
    });
}

function checkNull(value) {
    if (value === null) {
        return "";
    } else {
        return value;
    }
}

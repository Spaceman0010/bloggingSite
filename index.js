import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Purus semper eget duis at tellus. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Vehicula ipsum a arcu cursus vitae congue. Ut porttitor leo a diam sollicitudin tempor id. Lorem mollis aliquam ut porttitor. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. In nibh mauris cursus mattis. Et molestie ac feugiat sed lectus vestibulum mattis. Elit pellentesque habitant morbi tristique. Justo laoreet sit amet cursus. Proin sagittis nisl rhoncus mattis rhoncus. Est sit amet facilisis magna etiam tempor orci eu lobortis. Habitant morbi tristique senectus et netus et malesuada fames. Etiam dignissim diam quis enim lobortis scelerisque. Eu mi bibendum neque egestas congue. Amet nisl purus in mollis. Sagittis nisl rhoncus mattis rhoncus. Vel facilisis volutpat est velit egestas. Et tortor at risus viverra adipiscing at."

const aboutStartingContent = "Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Tellus molestie nunc non blandit massa enim nec dui nunc. Est ante in nibh mauris cursus. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Maecenas ultricies mi eget mauris pharetra et ultrices. Eu nisl nunc mi ipsum faucibus. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Cras semper auctor neque vitae. Commodo elit at imperdiet dui accumsan sit amet nulla. Ut sem nulla pharetra diam sit amet nisl suscipit. A erat nam at lectus urna duis convallis."

const contactStartingContent = "Eros in cursus turpis massa. Turpis cursus in hac habitasse platea dictumst quisque. Non sodales neque sodales ut etiam sit amet nisl purus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Nunc consequat interdum varius sit. Pellentesque id nibh tortor id aliquet lectus proin nibh. Quisque egestas diam in arcu cursus. Lacus sed turpis tincidunt id aliquet. Non curabitur gravida arcu ac. Sed viverra tellus in hac. Phasellus egestas tellus rutrum tellus pellentesque eu. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Felis eget velit aliquet sagittis id consectetur purus."

var sendInputs = [];


app.get("/", (req,res)=>{
    res.render("index.ejs"); 
})

app.get("/home", (req,res)=>{
    res.render("home.ejs", {homeContent : homeStartingContent, sendInputs : sendInputs});
})

app.get("/about", (req,res)=>{
    res.render("about.ejs", {aboutContent : aboutStartingContent});
})

app.get("/contact", (req,res)=>{
    res.render("contact.ejs", {contactContent : contactStartingContent});
})

app.get("/compose", (req,res)=>{
    res.render("compose.ejs");
})

app.post("/compose", (req,res)=>{
    // var blogTitle = req.body.composeTitle;
    // var blogPost = req.body.composePost;
    var sendInput = {
        blogTitle : req.body.composeTitle,
        blogPost : req.body.composePost,
    };
    // res.send(sendInput);
    sendInputs.push(sendInput);
    res.redirect("/home");
});

app.get("/posts/:postName", function (req, res) {
    const requestedBlogTitle = _.lowerCase(req.params.postName);
    
    // console.log(_.lowerCase(requestedBlogTitle));

        sendInputs.forEach(sendInput=>{
            const storedTitle = _.lowerCase(sendInput.blogTitle);
            if (requestedBlogTitle == storedTitle) {
                res.render("post.ejs", {title : sendInput.blogTitle, content : sendInput.blogPost})
                // console.log("Match Found !"); 
            }
        }); 
});



app.listen(port, (req,res)=>{
    console.log(`App started and listening on ${port}`);
})





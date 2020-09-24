//embed the documents const { mongo } = require("mongoose");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/Relation",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database Connected....");
  }
);

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});
const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: [authorSchema]
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find().populate("author", "name -_id");
  console.log(courses);
}

async function addAuthor(courseId,newAuthor){
    const course = await Course.findById(courseId);
    course.author.push(newAuthor);
    course.save();
}

async function removeAuthor(courseId,authorId){
    const course = await Course.findById(courseId);
    console.log("course ",course);
    const existingAuthor = await course.author.id(authorId);
    existingAuthor.remove();
    course.save();
}

async function updateAuthor(courseId, newAuthor){
    const course = await Course.findById(courseId);
    course.author.push(newAuthor);
    course.save();
}
// createAuthor('Max', 'max bio' ,'www.max-abc.com' );
// createCourse('aws ', [
//     new Author({name:"Mark"}),
//     new Author({name:"max"})]);
// listCourses();
// updateAuthor("5f66118a78b7a5369c5d75b2","preeti");

removeAuthor("5f66266d4162754008d822ae", "5f6714bc2b14a846f8e147f3");
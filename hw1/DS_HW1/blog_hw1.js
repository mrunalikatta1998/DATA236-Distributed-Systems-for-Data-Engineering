"use strict"; // enables strict mode and enforces stricter parsing

// Form validation function using an arrow function
const formValidation = () => {
    const blogTitle = document.getElementById("myBlogTitle").value.trim();
    const authorName = document.getElementById("userName").value.trim();
    const authorEmail = document.getElementById("userEmailAddress").value.trim();
    const blogContent = document.getElementById("myBlogContent").value.trim();
    const termsChecked = document.getElementById("terms").checked;

    if (!blogTitle || !authorName || !authorEmail || !blogContent) {
        alert("All fields are required!");
        return false;
    }

    if (blogContent.length <= 25) {
        alert("Blog content should be more than 25 characters");
        return false;
    }

    if (!termsChecked) {
        alert("You must agree to the terms and conditions");
        return false;
    }

    return true;
};

// Add an event listener to the form
document.getElementById("myBlogForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!formValidation()) return;

    // Collecting form data using spread operator and adding a submission date
    const blogData = {
        blogTitle: document.getElementById("myBlogTitle").value.trim(),
        authorName: document.getElementById("userName").value.trim(),
        authorEmail: document.getElementById("userEmailAddress").value.trim(),
        blogContent: document.getElementById("myBlogContent").value.trim(),
        category: document.getElementById("myBlogCategories").value,
        submissionDate: new Date().toISOString() // using spread operator to add new field
    };

    // JSON stringify the form data and log it
    const jsonData = JSON.stringify(blogData);
    console.log("JSON Data:", jsonData);

    // Using destructuring to extract and log the title and email
    const { blogTitle, authorEmail } = blogData;
    console.log(`Title: ${blogTitle}, Email: ${authorEmail}`);

    // Closure to count submissions
    console.log(`Total blogs submitted: ${blogCounter()}`);
    document.getElementById("myBlogForm").reset();
});

// Closure to track the number of blog submissions
const blogCounter = (() => {
    let count = 0;
    return () => ++count;
})();

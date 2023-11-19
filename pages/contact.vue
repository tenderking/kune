<script setup lang="ts"></script>

<template>
  <h1>Contact Us</h1>

  <p>
    We're always happy to hear from you. Please feel free to reach out with any
    questions, suggestions, or feedback.
  </p>

  <form action="mailto:info@kune.com" method="post" enctype="text/plain">
    <label for="name">Your Name:</label>
    <input type="text" id="name" name="name" required />

    <label for="email">Your Email:</label>
    <input type="email" id="email" name="email" required />

    <label for="subject">Subject:</label>
    <input type="text" id="subject" name="subject" required />

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5" required></textarea>

    <input type="submit" value="Send" />
  </form>
</template>
<style scoped>



main {
    padding: 20px;
}

h1 {
    margin-bottom: 20px;
}

p {
    line-height: 1.5;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    width: 500px;
}

label {
    display: block;
    margin-bottom: 5px;
     margin-top: 1em;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: var(--radius-sm);
}

textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: var(--radius-sm);

}

input[type="submit"] {
    background-color: var(--clr--primary);
    color: var(--clr--text);
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: var(--radius-sm);
    margin-top: 1em;
}



</style>

<template>
  <header>
    <img class="illustration" alt="Main page illustration" src="/hills.png">

    <div class="home-text">
      <h1>
        At <span class="kune"> Kune </span>, we provide an overwiew of Zimbabwean digital
        services
      </h1>
      <h2>Digital discovery made easy</h2>
      <p>
        Are you looking for place to easily find businesses that you need in one place?
        <span class="kune"> Kune </span> makes it a pleasant journey. You will find
        innovation and convience.
      </p>
      <NuxtLink to="/sign-in" class="sign-up-link">
        Sign up
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 2em;
  padding: 1em;
  max-width: max-content;
  gap: 2em;
}

header p {
  margin-bottom: 2em;
}

header h2 {
  font-weight: 700;
  margin-bottom: 0.5em;
}

img.illustration {
  max-width: 350px;
}

.home-text {
  max-width: 50ch;
}

h1 {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: border-box;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
}

a.sign-up-link {
  padding: 0.5em 1em;
  border-radius: 0.5em;
  background-color: var(--color-background-mute);
  text-transform: uppercase;
}

@media (min-width: 550px) {
  header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

<template>
  <header>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="552"
      height="344"
      viewBox="0 0 652 644"
      fill="none"
      class="mondrian"
    >
      <rect
        opacity="0.05"
        x="1"
        width="163"
        height="60"
        rx="10"
        fill="var(--color--text)"
      />
      <rect x="424" width="193" height="60" rx="10" fill="var(--color--secondary)" />
      <rect
        x="424"
        y="68"
        width="193"
        height="175"
        rx="10"
        fill="var(--color--secondary)"
      />
      <rect
        opacity="0.2"
        x="424"
        y="401"
        width="193"
        height="79"
        rx="10"
        fill="var(--clr--primary)"
      />
      <rect x="255" y="626" width="362" height="18" rx="9" fill="var(--color--bg)" />
      <rect x="80" y="579" width="166" height="65" rx="10" fill="var(--color--bg)" />
      <rect x="255" y="579" width="160" height="40" rx="10" fill="var(--color--text)" />
      <rect
        opacity="0.05"
        x="255"
        y="490"
        width="160"
        height="80"
        rx="10"
        fill="var(--color--text)"
      />
      <rect
        opacity="0.05"
        x="255"
        y="400"
        width="160"
        height="80"
        rx="10"
        fill="var(--color--text)"
      />
      <rect x="80" y="68" width="335" height="324" rx="10" fill="var(--clr--primary)" />
      <rect x="80" y="401" width="166" height="169" rx="10" fill="var(--color--text)" />
      <rect
        x="424"
        y="490"
        width="193"
        height="129"
        rx="10"
        fill="var(--color--accent)"
      />
      <rect x="626" y="490" width="26" height="154" rx="10" fill="var(--clr--primary)" />
      <rect x="424" y="252" width="91" height="140" rx="10" fill="var(--color--bg)" />
      <rect x="524" y="252" width="93" height="140" rx="10" fill="var(--color--bg)" />
      <rect
        opacity="0.05"
        x="626"
        width="26"
        height="480"
        rx="10"
        fill="var(--color--text)"
      />
      <rect x="173" width="242" height="60" rx="10" fill="var(--color--bg)" />
      <rect x="1" y="68" width="70" height="157" rx="10" fill="var(--color--bg)" />
      <rect
        opacity="0.05"
        x="1"
        y="234"
        width="70"
        height="259"
        rx="10"
        fill="var(--color--text)"
      />
      <rect
        x="1"
        y="502"
        width="70"
        height="142"
        rx="10"
        fill="var(--color--secondary)"
      />
    </svg>

    <div class="home-text">
      <h1 class="subtitle">
        <span class="kune"> Kune </span>, Digital discovery<br />
        made easy
      </h1>
      <p>
        Are you looking for place to easily find businesses that you need in one place?
        <span class="kune"> Kune </span> makes it a pleasant journey. You will find
        innovation and convience. We provide an overwiew of Zimbabwean digital services
      </p>
      <NuxtLink to="/auth/signup" class="cta__link"> Sign up </NuxtLink>
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
.mondrian {
  max-width: 100%;
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

.main__title {
  background: linear-gradient(315deg, var(--clr--primary) 25%, var(--clr--accent));
  background-clip: border-box;
  background-clip: text;
  -webkit-background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  font-weight: 900;
}

.kune {
  color: var(--clr--primary);
  font-weight: 900;
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

<template>
    <div id="app">
      <HeaderComponent />
      <div class="about">
        <h1 id="contacts-header">Contacts:</h1>
        <div class="contact-list">
            <div class="contact-item">
            <h3>Harmo-Ron Kallaste</h3>
            <p>Email: harmo@example.com</p>
            <p>Phone: +372</p>
            </div>
            <div class="contact-item">
            <h3>Reno Feliks Lindvere</h3>
            <p>Email: reno@example.com</p>
            <p>Phone: +372</p>
            </div>
            <div class="contact-item">
            <h3>Ron Aaron Vahtra</h3>
            <p>Email: ron@example.com</p>
            <p>Phone: +372</p>
            </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  
  <script>
  import HeaderComponent from '../components/Header.vue'
  import FooterComponent from '../components/Footer.vue'
  
  export default {
    name: "AboutView",
    components: {
    HeaderComponent,
    FooterComponent,
    },
  }
  </script>

<style scoped>
.about {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.contact-list {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.contact-item {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-item h3 {
  margin-bottom: 10px;
  color: #333;
}

.contact-item p {
  margin: 5px 0;
  color: #666;
}

#contacts-header {
    margin-bottom: 0.5em;
}
</style>
  
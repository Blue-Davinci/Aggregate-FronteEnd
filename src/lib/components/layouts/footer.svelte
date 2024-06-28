<script>
      import { Button } from "$lib/components/ui/button";
</script>
<footer>
    <div class="early-access" id="footer">
      <header>Get early access today</header>
      <p>
        It only takes a minute to sign up and our free starter tier is
        extremely generous. If you have any questions, our support team would
        be happy to help you.
      </p>
      <form method="POST" data-netlify="true">
        <input
          type="email"
          name="email"
          id=""
          placeholder="email@example.com"
        />
        <Button type="submit">Get Started For Free</Button>
      </form>
    </div>
    <div class="footer">
      <div class="logo"><img src="/agglogo.png" alt="logo" /></div>
      <div class="info">
        <div class="horizontal">
          <!-- addess -->
          <div class="address">
            <img src="/icon-location.png" alt="icon location" />
            <p>
              The aggregate project is located in Nairobi, Kenya
              and operates under <b>ALX Africa.</b>
            </p>
          </div>
        </div>
        <!-- email and phone -->
        <div class="horizontal">
          <div>
            <img src="/icon-phone.png" alt="icon phone" />
            <a href="tel:+1-543-123-4567"> +254-700-000-000 </a>
          </div>
          <div>
            <img src="/icon-email.png" alt="icon email" />
            <a href="mailto:example@fylo.com"> admin@aggregate.com </a>
          </div>
        </div>
        <!-- about -->
        <div class="horizontal">
          <a href="#footer">About Us</a>
          <a href="#footer">Jobs</a>
          <a href="#footer">Press</a>
          <a href="#footer">Blog</a>
        </div>
        <div class="horizontal">
          <a href="#footer">Contact us</a>
          <a href="#footer">Terms</a>
          <a href="#footer">Privacy</a>
        </div>
        <div class="social">
          <a href="#footer">
            <div>
              <img src="/facebook-f-brands.png" alt="twitter logo" />
            </div>
          </a>
          <a href="#footer">
            <div>
              <img src="/logo-twitter.png" alt="twitter logo" />
            </div>
          </a>
          <a href="#footer">
            <div>
              <img src="/logo-instagram.png" alt="twitter logo" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </footer>
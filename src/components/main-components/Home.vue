<template>
  <div class="home">
    <h2>{{ $props.msg }}</h2>
    <section class="highlight-p-tag">
      <p>
        I have spent time researching, designing and coding a ‘base’ for an
        enterprise software, portfolio type of application, and now the hard
        part comes: writing (and I use the term loosely), engaging content for
        visitors to this site. As I haven't taken the necessary steps for search
        engine optimization or attempted to generate traffic to this site, I am
        under the impression that you have arrived here via a LinkedIn link, or
        followed a link on my resume.
      </p>
      <p style="text-indent: 0">
        Please come on in, take a look around. Create an account (with gmail or
        protonmail, see below where I trash-talk Microsoft) and try it out.
      </p>
    </section>
    <hr class="hr-tag-2" />
    <figure class="figure-images">
      <img
        src="@/assets/images/mountaintop-jacques-holst-flickr-creativecommons.webp"
        class="images"
      />
      <figcaption>
        Adding creative commons image so visitors to this site have something to
        look at. <br />Search term: coolest creative commons images
      </figcaption>
    </figure>
    <hr class="hr-tag-2" />
    <section class="highlight-p-tag">
      <p>
        This site is a practical demonstration of full-stack developer skills.
        There is create account functionality with email confirmation and
        password reset, phone number verification using
        <a href="https://www.twilio.com/" target="blank" class="a-tag-style-two"
          >Twilio's</a
        >
        API, as well as two factor verification using Time-base One-time
        Password technologies. The back-end is the base of an identity
        management and a secure token server that is compliant with the OpenID
        Connect and OAuth 2.0 Protocols. There is a lot of functionality left to
        implement in order to make the back-end a full, multi-tenant identity
        and secure token server, and even though I have no use for a full,
        enterprise level auth & auth service, part of me wants to finish it off.
        That would take a considerable amount of time and effort for something I
        don't need and there are other software engineering (VR/AR/XR) topics I
        want to explore, so I'll leave the STS as a nice little portfolio piece.
      </p>
    </section>
    <hr class="hr-tag-2" />
    <figure class="figure-images">
      <img src="@/assets/images/pexels-snapwire-730896.jpg" class="images" />
      <figcaption>
        Adding creative commons image so visitors to this site have something to
        look at. <br />Search term: coolest creative commons images
      </figcaption>
    </figure>
    <hr class="hr-tag-2" />
    <section class="highlight-p-tag">
      <p>
        Currently, the apps are deployed to a virtual private server that is
        also running a SMTP application used for email verification & password
        reset. The SystemsDesign.rocks TDL doesn’t have a bad or spammy
        reputation (in fact, Gmail and Protonmail, give it a spam score of
        zero), and the DNS records are congifured correctly, still Microsoft’s
        mail transfer agents and their email threat protection software
        intermittently bounce email sent to @outlook.com, @live.com,
        @hotmail.com, @msn.com and @passport.com email addresses. Every six
        weeks or so I have to contact the Microsoft email sender support to
        inform them that a non-email-spammer, legit sender is being blocked
        again – it is frustrating(!) but I guess that's what you get when you're
        the liitle guy and no one knows you. It's either pay to play (to a
        Microsoft third party affiliate) for a "safe sender verification", or
        too bad for you sucker.
      </p>
    </section>
    <hr class="hr-tag-2" />
    <section class="highlight-p-tag">
      <p style="text-indent: 0; position: relative; top: -1rem">
        Yea really and I quote from (about half way down the page):
      </p>
      <p style="text-indent: 0; position: relative; top: -3rem">
        <a
          href="https://sendersupport.olc.protection.outlook.com/pm/troubleshooting.aspx"
          target="blank"
          class="a-tag-style-two"
          >https://sendersupport.olc.protection.outlook.com/pm/troubleshooting.aspx</a
        >
      </p>
      <blockquote style="text-indent: 0; position: relative; top: -3rem">
        <h6 style="max-width: 45rem; margin: auto auto; font-style: italic">
          How can I prevent my messages from being marked as from an "unknown
          sender" in the Outlook.com interface?
        </h6>
        <p
          style="
            text-indent: 0;
            max-width: 45rem;
            margin: auto auto;
            font-style: italic;
            color: var(--h-tag-colour);
          "
        >
          One way to ensure that your messages aren't marked as being from an
          "unknown sender" is to join
          <a
            href="https://www.validity.com/everest/sender-certification/"
            target="blank"
            class="a-tag-style-two"
            >Return Path's Certification program</a
          >, a third-party accreditation and reputation service that provides
          Outlook.com with a list of responsible senders.
        </p>
      </blockquote>
    </section>
    <hr class="hr-tag-2" />
    <section class="highlight-p-tag">
      <p>
        From the reading I have done regarding Microsoft and their mail transfer
        agents / email spam filters, I suspect the problems arise from my server
        sending so few emails...I will try to explain.
      </p>
      <p>
        To my understanding, Microsoft keeps track of how many incoming emails
        are sent to Microsoft email accounts, from a specific TDL. If that
        domain sends 1 email in April, sends 2 emails in May, zero email in
        June, then sends 8 email messages in August, all of a sudden the domain
        sent 300% more messages then it did the preceeding couple of months.
        Microsoft's algorithmic spam filters say it must be spam, "For such an
        increase to have occurred, a hacker must have gained access to the
        domain's smtp server and it is now sending out spam."
      </p>
      <p>
        Scale that same senario up to tens of thousands of email per month and
        an increase from lets say, 20 000 email to 23 543 email, the percentage
        increase isn't so dramatic. It just looks like that domain had 3 543
        more email addresses added to its mailing list. But if that domain all
        of a sudden sent out 80 000 email in a month, that jump in sent quantity
        would trigger Mircosoft's spam filter.
      </p>
      <p style="text-indent: 0">All in all, it sucks to be the little guy.</p>
    </section>
    <hr class="hr-tag-2" />
    <figure class="figure-images">
      <img src="@/assets/images/article148538.jpg" class="images" />
      <figcaption>
        Adding creative commons image so visitors to this site have something to
        look at. <br />Search term: coolest creative commons images
      </figcaption>
    </figure>
  </div>
  <hr class="hr-tag-2" />
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onUnmounted } from "vue";
import {
  showBackgroundObserverOptions,
  buildShowBackgroundObserverOptions,
  showBackgroundIntersectionObserver,
} from "@/assets/js/helper-functions";

let pTagBackgroundObserver: IntersectionObserver;
defineProps({ msg: String });
onMounted(() => {
  const windowWidth: number = window.innerWidth;
  const windowHeight: number = window.innerHeight;
  const options: showBackgroundObserverOptions =
    buildShowBackgroundObserverOptions(windowWidth, windowHeight);
  pTagBackgroundObserver = showBackgroundIntersectionObserver(
    "highlight-p-tag",
    "highlight-p-tag__observer",
    options
  );
});
onUnmounted(() => {
  pTagBackgroundObserver.disconnect();
});
</script>

<style>
.home {
  min-height: 50vh;
}
</style>

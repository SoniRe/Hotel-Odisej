function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

loco();

function splitIntoSpan(target) {
  var clutter = "";

  document
    .querySelector(target)
    .textContent.split("")
    .forEach((letter) => {
      clutter += `<span>${letter}</span>`;
    });

  document.querySelector(target).innerHTML = clutter;
}

splitIntoSpan("#page2 h1");
splitIntoSpan("#page3 h1");

var tl = gsap.timeline();

tl.from("#page1 svg", {
  opacity: 0,
  y: -300,
  duration: 0.7,
});

tl.from("#page1 img", {
  delay: 1,
  scale: 0.5,
  duration: 0.7,
});

tl.from("#page1 #nav", {
  opacity: 0,
  y: -300,
  duration: 0.7,
});

gsap.from("#page2 h1 span", {
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: "#page2 h1 span",
    scroller: "#main",
    scrub: 1,
    start: "top 60%",
    end: "bottom -40%",
  },
});

gsap.from("#page2-bottom svg:nth-child(1)", {
  left: "-100%",
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    scrub: 1,
    start: "bottom 100%",
    end: "bottom 0%",
  },
});

gsap.from("#page2-bottom svg:nth-child(2)", {
  left: "-100%",
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    scrub: 1,
    start: "bottom 100%",
    end: "bottom 0%",
  },
});

gsap.from("#page3 h1 span", {
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: "#page3 h1 span",
    scroller: "#main",
    scrub: 1,
    start: "top 90%",
    end: "bottom 60%",
  },
});

var tl2 = gsap.timeline();

tl2.from("#page3-part1", {
  opacity: 0,
  y: 400,
  scrollTrigger: {
    trigger: "#page3-part1",
    scroller: "#main",
    scrub: 3,
    start: "top 120%",
    end: "top 100%",
  },
});

tl2.from("#page3-part2", {
  opacity: 0,
  y: 400,
  scrollTrigger: {
    trigger: "#page3-part2",
    scroller: "#main",
    scrub: 3,
    start: "top 120%",
    end: "top 100%",
  },
});

tl2.from("#page3>img", {
  opacity: 0,
  y: 400,
  scrollTrigger: {
    trigger: "#page3>img",
    scroller: "#main",
    scrub: 3,
    markers: true,
    start: "top 120%",
    end: "top 100%",
  },
});

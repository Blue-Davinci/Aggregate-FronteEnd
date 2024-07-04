<script>
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

</script>

<nav class="">
    <div class="logo px-4 py-2">
      <img src="/agglogo.png" class="h-30" alt="Aggregate logo" />
    </div>
    <ul class="flex space-x-4 px-4 py-2">
      <a href="#intro" on:click|preventDefault={() => scrollToSection('intro')} class="hover:text-gray-300 transition-colors duration-300">
        <li class="cursor-pointer">Introduction</li>
      </a>
      <a href="#productivity" on:click|preventDefault={() => scrollToSection('productivity')} class="hover:text-gray-300 transition-colors duration-300">
        <li class="cursor-pointer">Features</li>
      </a>
      <a href="#reviews" on:click|preventDefault={() => scrollToSection('reviews')} class="hover:text-gray-300 transition-colors duration-300">
        <li class="cursor-pointer">Reviews</li>
      </a>
    </ul>
  </nav>
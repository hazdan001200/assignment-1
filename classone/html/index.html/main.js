//change nav bar style on scroll//

alert('hello')

window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle
    ('window-scroll' , window.scrollY > 0)
})
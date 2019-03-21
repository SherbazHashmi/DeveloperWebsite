this.currentSelection = 'tab-home';
this.goButton = document.getElementById('go');
this.descriptions = {
    'tab-home': {
        'url': 'index.html',
        'name': 'Home',
        'description' : 'The home page gives you a quick glance into what I have been working on. It includes a preview of my blog posts, the teams I am a part of and general information about myself and my skills.',
    },
    'tab-blog': {
        'url': 'index.html#blog',
        'name': 'Blog',
        'description' : 'Learn new skills, understand concepts and work through problems alongside me by reading my blog posts. My blog posts are a series of articles discussing projects that I may be working on at the time or new technologies that I enjoy using.',
    },
    'tab-map': {
        'url': '',
        'name': 'Site Map',
        'description' : 'Explore the website to see exactly where all the webpages are. Maybe even find something new, some say one might encounter an easter egg if you press the blog button a couple of times.',
    },
}
this.setText();    

function changeSelection(element) {
    this.currentSelection = element.id;
    this.setText();    
}


function redirect() {
    const currentSelectionInfo = this.descriptions[this.currentSelection];
    window.location.href = currentSelectionInfo.url;
}

function setText() {
    const currentSelectionInfo = this.descriptions[this.currentSelection];
    document.getElementsByClassName('sitemap-content__title')[0].innerHTML = `<span style="text-align: center;"> ${currentSelectionInfo['name']} </span>`;
    document.getElementsByClassName('sitemap-content__text')[0].innerHTML = `<span> ${currentSelectionInfo['description']} </span>`;
}

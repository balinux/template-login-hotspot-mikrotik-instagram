Vue.component('covid19', {
    data: function () {
        return {
            covid2: null,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData: function () {
            fetch('https://indonesia-covid-19.mathdro.id/api')
                .then(response => response.json())
                .then(json => {
                    this.covid2 = json;
                })
        }
    },
    template: ' <table class="table"> <caption style="font-size: 16px; font-weight: bold; margin-bottom:5px;">Informasi Covid19 indonesia</caption> <tr> <th>Positif</th> <th>Sembuh</th> <th>Meninggal</th> </tr><tr v-if="covid2 !==null"> <td>{{covid2.jumlahKasus}}</td><td>{{covid2.sembuh}}</td><td>{{covid2.meninggal}}</td></tr></table>'
});

Vue.component('yhotie-ig-banner', {
    props: {
        username: String,
        header: String
    },
    data: function () {
        return {
            imgIgCollection: [],
        }
    },
    created() {
        this.getInstagaramPost();
    },
    methods: {
        getInstagaramPost: function () {
            fetch(`https://www.instagram.com/${this.username}/?__a=1`)
                .then(response => response.json())
                .then(async json => {
                    const { edge_owner_to_timeline_media } = await json.graphql.user;
                    this.imgIgCollection = [...this.imgIgCollection, ...edge_owner_to_timeline_media.edges]
                })
                .then(() => {
                    if (this.imgIgCollection.length != 0) {
                        this.getSlide()
                    }
                })
        },
        getSlide: function () {
            var slideIndex = 0;
            showSlides();
            function showSlides() {
                var i;
                var slides = document.getElementsByClassName("mySlides");
                var dots = document.getElementsByClassName("dot");
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slideIndex++;
                if (slideIndex > slides.length) { slideIndex = 1 }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }
                slides[slideIndex - 1].style.display = "block";
                dots[slideIndex - 1].className += " active";
                setTimeout(showSlides, 3000); // Change image every 2 seconds
            }
        }
    },
    template: ' <div> <br/> <div style="font-size: 16px; font-weight: bold;   text-align: center; margin-bottom:5px;">{{header}}</div> <div class="slideshow-container"> <div v-for="(item, index) in imgIgCollection" :key="index" class="mySlides fade"> <div class="numbertext">{{index+1}}/{{imgIgCollection.length}}</div><img :src="item.node.display_url" style="width:100%"> </div></div><br/> <div style="text-align:center"> <span v-for="(item, index) in imgIgCollection" :key="index" class="dot"></span> <span class="dot"></span> </div></div>'
});

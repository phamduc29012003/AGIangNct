const $ = document.querySelector.bind(document);

const player = $('.player')
const heading = $(".music-name");
const author = $(".music-author");
const audio = $("#audio");

const playlist = $('.song-list')
const playBtn = $('.play-btn');
const progress = $('#progress')

const app = {
    isPlaying:false,
  currentIndex: 0,
  songs: [
    {
      name: " Chúng ta bấy lâu nay là",
      singer: "Phạm Quỳnh Anh",
      path: "./assets/music/ChungTaBayLauNayLaLiveSession-PhamQuynhAnhTrungQuanIdol-9422553.mp3",
      image: "./assets/img/ctabaylaunayla.jpg",
    },
    {
      name: "Vẫn nhớ",
      singer: "Tuấn Hưng",
      path: "./assets/music/VanNho-TuanHung-4044663.mp3",
      image: "./assets/img/vannho.jpg",
      
      lyric:"Chưa có lời bài hát"
    },
    {
      name: "Mưa Hồng",
      singer: "Lê Hiếu",
      path: "./assets/music/MuaHong-LeHieu_8e.mp3",
      image: "./assets/img/muahong.jpg",
      
      lyric:"Chưa có lời bài hát"
    },
    {
      name: "Em của quá khứ",
      singer: "Nguyễn Đình Vũ",
      path: "./assets/music/EmCuaQuaKhu-NguyenDinhVu-3803580.mp3",
      image: "./assets/img/emcuaquakhu.jpg",
      
      lyric:"Chưa có lời bài hát"
    },
    {
      name: "Chúng ta là anh em",
      singer: "Ngọc Tùng",
      path: "./assets/music/ChungTaLaAnhEm-NgocTurbo-5353358.mp3",
      image: "./assets/img/ctalaanhem.jpg",
      lyric:"Chưa có lời bài hát"
    },
  ],
  render: function () {
    const htmls = this.songs.map((song,index) => {
      return `
            <div class="song" data-index='${index}'>
                    <img src="${song.image}" alt="">
                    <h4 class="pl-song-name">${song.name}</h4>
                    <div class="pl-singer">${song.singer}</div>
            </div>
            `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handlerEvents:function() {
    const _this= this
    playBtn.onclick = function(){
        if (_this.isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
    }
    audio.onplay = function() {
        _this.isPlaying= true
        player.classList.add('playing') 
    }
    audio.onpause = function() {
        _this.isPlaying= false
        player.classList.remove('playing')
    }
    audio.ontimeupdate = function () {
        if(audio.duration) {
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent
        }
    }
    progress.onchange = function(e) {
        const seekTime = audio.duration /100 * e.target.value 
        audio.currentTime = seekTime    
    }
    playlist.onclick = function (e){
        const songNode = e.target.closest('.song')
        if(songNode){
            _this.currentIndex = songNode.dataset.index
            _this.loadCurrentSong()
            audio.play()
        }
    }
  },
  loadCurrentSong: function () {
    const currentImage = $(".music-container img");
    currentImage.src = this.currentSong.image;
    heading.textContent = this.currentSong.name;
    author.textContent = this.currentSong.singer;
    audio.src = this.currentSong.path;
  },
  start: function () {
    this.defineProperties();
    this.handlerEvents();
    this.loadCurrentSong();
    
    this.render();
  },
};
app.start();

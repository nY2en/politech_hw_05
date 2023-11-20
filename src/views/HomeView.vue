<template>
  <div
    class="area"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
  >
    <form>
      <ul>
        <li v-for="categorie in categories" :key="categorie.id">
          <input
            type="checkbox"
            :id="categorie.id"
            :value="categorie.id"
            @change="handleCategoriesChange"
            :name="categorie.type"
          />
          <label :for="categorie.id">{{ categorie.type }}</label>
        </li>
      </ul>
    </form>

    <NoteCard
      v-for="(note, index) in notes"
      :key="note.id"
      :note="note"
      :idx="index"
    />
    <button class="btn" @click="addNote">Add note</button>
  </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";

export default {
  data() {
    return {
      currentNoteIdx: null,
      isAction: false,
      startCoords: {
        x: 0,
        y: 0,
      },
      currentCoords: {
        x: 0,
        y: 0,
      },
    };
  },

  created() {
    this.$store.dispatch("fetchNotes");
    this.$store.dispatch("fetchCategories");
  },

  computed: {
    notes() {
      return this.$store.getters.filteredNotes;
    },

    categories() {
      return this.$store.state.categories;
    },
  },

  methods: {
    addNote() {
      const newNote = {
        id: Date.now(),
        coords: {
          x: 0,
          y: 0,
        },
        text: "",
        categorie: 1,
      };

      this.$store.dispatch("addNote", newNote);
    },

    handleMouseDown(e) {
      if (e.target.classList.contains("hud")) {
        this.isAction = true;
        this.currentNoteIdx = e.target.parentNode.getAttribute("idx");
        this.startCoords.x = e.pageX;
        this.startCoords.y = e.pageY;
      }

      if (e.target.classList.contains("textarea")) {
        this.currentNoteIdx = e.target.parentNode.getAttribute("idx");
      }
    },

    handleMouseMove(e) {
      if (this.isAction) {
        this.currentCoords.x =
          this.notes[this.currentNoteIdx].coords.x +
          (e.pageX - this.startCoords.x);

        this.currentCoords.y =
          this.notes[this.currentNoteIdx].coords.y +
          (e.pageY - this.startCoords.y);

        const areaWidth = document.querySelector(".area").offsetWidth;
        const areaHeight = document.querySelector(".area").offsetHeight;
        const noteWidth = document.querySelector(".note").offsetWidth;
        const notHeight = document.querySelector(".note").offsetHeight;

        if (this.currentCoords.x <= 0) this.currentCoords.x = 0;
        if (this.currentCoords.x >= areaWidth - noteWidth)
          this.currentCoords.x = areaWidth - noteWidth;

        if (this.currentCoords.y <= 0) this.currentCoords.y = 0;
        if (this.currentCoords.y >= areaHeight - notHeight)
          this.currentCoords.y = areaHeight - notHeight;

        document.querySelector(
          `.note[idx="${this.currentNoteIdx}"]`
        ).style.left = `${this.currentCoords.x}px`;

        document.querySelector(
          `.note[idx="${this.currentNoteIdx}"]`
        ).style.top = `${this.currentCoords.y}px`;
      }
    },

    handleMouseUp() {
      if (this.isAction) {
        this.isAction = false;
        this.notes[this.currentNoteIdx].coords.x = this.currentCoords.x;
        this.notes[this.currentNoteIdx].coords.y = this.currentCoords.y;

        this.$store.dispatch("updateNote", this.notes[this.currentNoteIdx]);
      }
    },

    handleCategoriesChange(e) {
      if (e.target.checked) {
        this.$store.dispatch("checkCategorie", e.target.value);
      } else this.$store.dispatch("unCheckCategorie", e.target.value);
    },
  },

  components: { NoteCard },
};
</script>

<style scoped>
.area {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  background-color: skyblue;
}

.btn {
  position: fixed;
  bottom: 1%;
  right: 1%;
  padding: 12px;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  border-radius: 12px;
  border: none;

  background-color: #fa8072;
  color: #fff;

  transition: transform 250ms linear;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
}
</style>

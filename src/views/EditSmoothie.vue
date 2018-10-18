<template>
    <section v-if="smoothie">
        <h2>Edit {{ smoothie.title }} Smoothie</h2>
        <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input v-model="smoothie.ingredients[index]" type="text" name="ingredient">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add An Ingredient</label>
                <input @keydown.tab.prevent="addIng" v-model="another" type="text" name="add-ingredient">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
    </section>
</template>

<script>
import slugify from "slugify"
import db from "@/firebase/init"

export default {
    name: "EditSmoothie",
    data() { return {
        smoothie: undefined,
        another: undefined,
        feedback: undefined
    }},
    methods: {
        editSmoothie() {
            if(this.smoothie.title) {
                this.feedback = undefined
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: "-",
                    remove: /[$*_+-.()'"`\\!~:@]/g,
                    lower: true
                })
                db.collection("smoothies").doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    slug: this.smoothie.slug,
                    ingredients: this.smoothie.ingredients,
                }).then(() => {
                    this.$router.push({ name: "Home" })
                }).catch(err => console.log(err))

            }else {
                this.feedback = "You must enter a smoothie title!"
            }
        },
        addIng() {
            if(this.another) {
                this.smoothie.ingredients.push(this.another)
                this.another = ""
                this.feedback = undefined
            } else {
                this.feedback = "You must enter a value to add an ingredient!"
            }
        },
        deleteIng(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient !== ing
            })
        }
    },
    created() {
        let ref = db.collection("smoothies").where("slug", "==", this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style lang="scss" scoped>
    section {
        margin-top: 4em;
        padding: 2em;
        max-width: 500px;
        h2 {
            font-size: 2em;
            margin: 2em auto;
        }
        .field {
            margin: 2em auto;
            position: relative;
            .delete {
                position: absolute;
                right: 0;
                bottom: 1em;
                color: #aaa;
                font-size: 1.4em;
                cursor: pointer;
            }
        }
    }
</style>

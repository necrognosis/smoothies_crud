<template>
    <section>
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="addSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input v-model="ingredients[index]" type="text" name="ingredient">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add An Ingredient</label>
                <input @keydown.tab.prevent="addIng" v-model="another" type="text" name="add-ingredient">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </section>
</template>

<script>
import slugify from "slugify"
import db from "@/firebase/init"

export default {
    name: "AddSmoothie",
    data() { return {
        title: undefined,
        another: undefined,
        ingredients: [],
        feedback: undefined,
        slug: undefined
    }},
    methods: {
        addSmoothie() {
            if(this.title) {
                this.feedback = undefined
                this.slug = slugify(this.title, {
                    replacement: "-",
                    remove: /[$*_+-.()'"`\\!~:@]/g,
                    lower: true
                })
                db.collection("smoothies").add({
                    title: this.title,
                    slug: this.slug,
                    ingredients: this.ingredients,
                }).then(() => {
                    this.$router.push({ name: "Home" })
                }).catch(err => console.log(err))

            }else {
                this.feedback = "You must enter a smoothie title!"
            }
        },
        addIng() {
            if(this.another) {
                this.ingredients.push(this.another)
                this.another = ""
                this.feedback = undefined
            } else {
                this.feedback = "You must enter a value to add an ingredient!"
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient !== ing
            })
        }
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

<template>
    <v-card>
        <v-card-title>
            formularz zgłoszenia straty
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-form>
                        <v-text-field label="Tytuł"></v-text-field>

                        <v-subheader>Dane kontaktowe</v-subheader>
                        <v-text-field label="email"></v-text-field>
                        <v-text-field label="numer telefonu"></v-text-field>

                        <v-subheader>Wybierz date, lub okres zgubienia </v-subheader>
                        <v-date-picker  v-model="dates" range ></v-date-picker>
                        <v-subheader>Wybierz kategorie zgubionego przedmiotu</v-subheader>
                        <v-select
                            v-model="select"
                            :hint="`${category_select.category}`"
                            :items="category_items"
                            item-text="category"
                            item-value="category"
                            label="Kategoria"
                            persistent-hint
                            return-object
                            single-line
                        ></v-select>

                        <br/>
                        <v-subheader>Dodatkowe tagi</v-subheader>
                        <div class='tag-input'>
                            <div v-for='(tag, index) in tags' :key='tag' class='tag-input__tag'>
                            <span @click='removeTag(index)'>x</span>
                            {{ tag }}
                            </div>
                            <input 
                                type='text' 
                                placeholder="Wprowadź dodatkowe tagi" 
                                class='tag-input__text' 
                                @keydown.enter='addTag' 
                                @keydown.188='addTag'
                            />
                        </div>

                        <br/>
                        <v-subheader>Miejsce</v-subheader>
                         <v-text-field label="Podaj miejsce zgubienia"></v-text-field>
                        <br/>

                        <v-textarea
                            filled
                            name="input-7-1"
                            label="Dodatkowe uwagi"
                        ></v-textarea>
                    </v-form>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary">Opublikuj</v-btn>
        </v-card-actions>
    </v-card> 
</template>

<script>
    export default {
    data: () => ({
        dates: ['2021-09-10', '2021-09-20'],
        category_select: { category: 'Odziez'},
        category_items: [
            { category: 'Odziez'},
            {category: 'Artykuły biurowe'},
            {category: 'Akcesoria skurzane'},
            {category: 'inne'},
        ],
        tags: []
    }),
    methods: {
         addTag (event) {
            event.preventDefault()
            var val = event.target.value.trim()
            if (val.length > 0) {
                this.tags.push(val)
                event.target.value = ''
            }
        },
        removeTag (index) {
            this.tags.splice(index, 1)
        }
    }
    }
</script>

<style scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
  color: black;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
  color: aliceblue;
}
</style>
<template>
    <v-card>
        <v-card-title  class="headline justify-center mb-1">
            formularz zgłoszenia straty przedmiotu
        </v-card-title>
        <v-card-text>
            <v-form>
            <v-row>
                <v-col cols="12" md="4" >
                        <v-subheader>Tytuł ogłoszenia</v-subheader>
                </v-col> 
                <v-col cols="12" md="6" >
                        <v-text-field label="Tytuł"></v-text-field>
                </v-col>  
            </v-row>
            <v-row>
                <v-col cols="12" md="4" >   
                        <v-subheader>Dane kontaktowe</v-subheader>
                </v-col> 
                <v-col cols="12" md="6" >      
                        <v-text-field label="email"></v-text-field>
                        <v-text-field label="numer telefonu"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" >   
                    <v-subheader>Wybierz date, lub okres zgubienia </v-subheader>
                </v-col> 
                <v-col cols="12" md="6" >      
                    <v-date-picker  v-model="dates" range ></v-date-picker>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" >   
                    <v-subheader>Wybierz kategorie zgubionego przedmiotu</v-subheader>
                </v-col> 
                <v-col cols="12" md="6" >      
                    <v-select
                            :items="categories"
                            label="Kategoria"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" >   
                    <v-subheader>Dodatkowe tagi</v-subheader>
                </v-col> 
                <v-col cols="12" md="6" >      
                    <div class='tag-input'>
                            <div v-for='(tag, index) in tags' :key='tag' class='tag-input__tag'>
                            <span @click='removeTag(index)'>x</span>
                            {{ tag }}
                            </div>
                            <v-input 
                                type='text' 
                                placeholder="Wprowadź dodatkowe tagi" 
                                class='tag-input__text' 
                                @keydown.enter='addTag' 
                                @keydown.188='addTag'
                            />
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" >   
                    <v-subheader>Wybierz miasto w którym zgubiono przedmiot</v-subheader>
                </v-col> 
                <v-col cols="12" md="6" >      
                    <v-select
                            :items="cities"
                            label="Miasto"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4" >   
                    <v-subheader>Dodatkowe uwagi</v-subheader>
                </v-col> 
                <v-col cols="12" md="6" >      
                    <v-textarea
                            filled
                            name="input-7-1"
                            label="Dodatkowe uwagi"
                        ></v-textarea>
                </v-col>
            </v-row> 
        </v-form>
        </v-card-text>
        <v-layout justify-center>
        <v-card-actions>
            <v-btn 
            color="primary" v-on:click="publish">Opublikuj</v-btn>
        </v-card-actions>
        </v-layout>
    </v-card> 
    
</template>

<script>
    export default {
    data: () => ({
        dates: ['2021-09-10', '2021-09-20'],
        categories: ['Odziez', 'Artykuły biurowe', 'Akcesoria skurzane', 'inne'],
        cities: ['Warszawa', 'Gdańsk','Poznań','Kraków'],
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
        },
        publish(){
            this.$router.push({
                path: 'form_publish_success',
            });

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

.v-subheader{
    font-size: 25px;
}
</style>
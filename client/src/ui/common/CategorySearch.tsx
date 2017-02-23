import * as React from 'react'
import * as Autosuggest from 'react-autosuggest'
import {Category} from '../../core/domain/Category'
import {categoryEndpoint} from '../../endpoint/index'

interface Props {
   onSelect: (category: Category) => void
}

interface State {
   suggestions: Category[],
   value: string,
   selected: boolean
}

export class CategorySearch extends React.Component<Props, State> {

   state = {
      suggestions: [],
      value: '',
      selected: false
   }

   render() {
      const {suggestions, value, selected} = this.state
      if (!selected) return <Autosuggest
         suggestions={suggestions}
         onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
         onSuggestionsClearRequested={this.onSuggestionsClearRequested}
         getSuggestionValue={this.getSuggestionValue}
         renderSuggestion={this.renderSuggestion}
         onSuggestionSelected={this.onSuggestionSelected}
         inputProps={{
               placeholder: 'Placeholder',
               value,
               onChange: this.onChange
         }}/>
      else return <div onClick={() => this.setState({selected: false})}>
         {value}
      </div>
   }

   onSuggestionsFetchRequested = ({value}) => {
      categoryEndpoint
         .searchByName(value)
         .subscribe(suggestions => this.setState({suggestions}))
   }

   onSuggestionsClearRequested = () => this.setState({suggestions: []})

   getSuggestionValue = (category: Category) => category.name

   renderSuggestion = (suggestedCategory: Category) => <div>
      {suggestedCategory.name}
   </div>

   onChange = (event, {newValue}) => this.setState({
      value: newValue
   })

   onSuggestionSelected = (category: Category) => {
      this.setState({selected: true})
      this.props.onSelect(category)
   }

}

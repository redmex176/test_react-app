import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name: "Алексей А.", salary: 1000,increase: false, like: false, id: 1},
                {name: "Михаил А.", salary: 800,increase: true, like: false, id: 2},
                {name: "Ольга А.", salary: 2000,increase: false, like: true, id: 3},
                {name: "Анна А.", salary: 1200,increase: false, like: false, id: 4}
            ], 
            term: '',
            filter: 'all'
        }
        this.maxId = 5
    }
   
    
    deleteItem = (id) => {
        this.setState(({data})=> {
            const index = data.findIndex(elem => elem.id === id)
            return{
                data: data.filter(item => item.id !== id)
            }
        
        })
        
    }

    addItem = (name, salary) => {
        if(name.length > 3 && salary.length > 3) {
            const newItem = {
                name, 
                salary,
                increase: false,
                like: false,
                id: this.maxId++
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            }); 
        }
        
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, increase: !old.increase};
            const newArr = [...data.slice(0, index),newItem, ...data.slice(index + 1)];
            return{
                data: newArr
            }
        })
    }

    onToggleLike = (id)=> {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index),newItem, ...data.slice(index + 1)];
            return{
                data: newArr
            }
        })
    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item=> {
            return item.name.indexOf(term) > -1;
        })
    }
    
    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'like': 
                return items.filter(item => item.like);
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);
            default: 
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render(){
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const encreased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                employees={employees} 
                encreased={encreased} />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch = {this.onUpdateSearch}/>
                    <AppFilter 
                    filter = {filter}
                    onFilterSelect= {this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleLike={this.onToggleLike} />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;
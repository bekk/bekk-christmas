---
calendar: react
post_year: 2020
post_day: 22
title: Create a generic table with React and Typescript
image: https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3900&q=80
authors:
  - Miina Lervik
---
When I first started out with Typescript I found it very difficult to create the correct types when making generic components. In this article we will create a generic Table component that can be used with any set of objects. We will make a columns definition that lets the user of <Table> make adjustments to how the data should be displayed.

This article assumes you already have some basic knowledge about React and Typescript.

This will be our final result

![A table displaying the following details about various cats: theyr name, color, age in years, gender, activity level, and favorite food](assets/cattable.jpg "The final product")


# Lets get started!

I will be using a data set of cats. The cat objects will look like this:

```javascript
 interface Cat {
   name: string;
   age: number;
   gender: string;
   color: string;
   activityLevel?: string; // optional, same as string | undefined
   favoriteFood?: string;  // optional, same as string | undefined
 }
```

But you can use any kind of data set you like.

The Table component takes in data and columns as props, then renders a TableHeader and TableRows. I will get back to those shortly. First lets take a closer look at the props.

```javascript
type ColumnDefinitionType<T, K extends keyof T> = {
    field: K;
    header: string;
    width?: number;
}
```

(ColumnDefinitionType is importet from globalTypes.ts)

```javascript
type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}

const style = { // same as before
  borderCollapse: 'collapse'
} as const

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
  return ( // same as before
    <table style={style}>
      <TableHeader columns={columns} />
      <TableRows
        data={data}
        columns={columns}
      />
    </table>
  );
};

export default Table;
```

First, look at the columns. It is of type `ColumnsDefinitionType<T, K extends keyof T>` 😵 T basically means "any type is ok". In our case T will be the cat object. `K extends keyof T` means that K is a valid key of the object T. You know how you would write `cat.name` <-- "name" is a key of cat. We see that the K is used as a type for our `field` property. This means that field can only be one of the properties we have in our cat object: 'name', 'age', 'favoriteFood'... This might be a bit confusing now, but hopefully it will get clearer when we get to the usage of columns further down.

The data that we send in is an `Array<T>`, so in our case an array of cat objects. But as I said, it could be anything!

Finally, the Table component returns JSX.Element. This is what a function component normally returns and you often don't have to define this return type as typescript will be able to guess the return type for you.

Now, lets look at the TableHeader component. It takes in columns as props, and the type definitions there are the same as for our table component.

```javascript
type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
}

const TableHeader = <T, K extends keyof T>({ columns }: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      width: column.width ?? 100, // 100 is our default value if width is not defined
      borderBottom: '2px solid black'
    };

    return (
      <th
        key={`headCell-${index}`}
        style={style}
      >
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};

export default TableHeader;
```

We are creating the header row for our table by mapping through our columns array. For each column we check if the width is defined. If not we use a default value to create our style. This way the user of Table is able to define how wide each column should be to better fit their data set.
Then we set the header. By using our columns definition the user can decide the order of each column without having to alter the data set in any way. If you want 'age' to be displayed before 'name' in our cat table, then all you do is define that in the columns definition. You can also decide to only display some of the properties in you data object.

Lets look at TableRows. It takes in both data and columns as props.

```javascript
type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}

const style = {
  border: '1px solid black'
}

const TableRows = <T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
          return (
            <td key={`cell-${index2}`} style={style}>
              {row[column.field]}
            </td>
          );
        }
        )}
      </tr>
    );
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
};

export default TableRows;
```

There is a lot of mapping going on 😵 Please bear with me 😅
We create each row by mapping though our data set (our list of cats). For each cat object we now use the columns definition to pick which properties should be placed first, second, third... in our table. We do this by calling `row[column.field]`. Row is our cat. If column.field return 'name' then this is the same as saying `cat.['name']` or `cat.name`.

Now we are ready to use our Table!

We start by defining our data set which is of the type `Cat[]`. 

```javascript
  const data: Cat[] = [
    {
      name: 'Mittens',
      color: 'black',
      age: 2,
      gender: 'female',
      activityLevel: 'hight',
      favoriteFood: 'milk'
    },
    {
      name: 'Mons',
      color: 'grey',
      age: 2,
      gender: 'male',
      favoriteFood: 'old socks',
      activityLevel: 'medium'
    },
    {
      name: 'Luna',
      color: 'black',
      age: 2,
      gender: 'female',
      activityLevel: 'medium',
      favoriteFood: 'fish'
    },
    {
      name: 'Bella',
      color: 'grey',
      age: 1,
      gender: 'female',
      activityLevel: 'high',
      favoriteFood: 'mice'
    },
    {
      name: 'Oliver',
      color: 'orange',
      age: 1,
      gender: 'male',
      activityLevel: 'low',
      favoriteFood: 'fish'
    }
  ]
```

Then we must define how we'd like our columns to be displayed.
Maybe we just want to show some of the properties. We could make a columns definition like this:

```javascript
  const columns: ColumnDefinitionType<Cat, keyof Cat>[] = [
    {
      field: 'name',
      header: 'Name',
      width: 150
    },
    {
      field: 'age',
      header: 'Age in years',
    },
    {
      field: 'color',
      header: 'Color'
    }
  ]
```

Here we see how the `<T, K extends keyof T>` us used with a specific object. `<Cat, keyof Cat>`. Now, just for fun, try to alter field: 'name', to field: 'Name' (capital N).  Typescript will give you an error because "Name" is not a valid key of our cat object! This means that if you rename the properties in your data set typescript will let you know that you also have to rename the field property in your column definition! Isn't that amazing?

And then we send the data and columns into our table:

```javascript
<Table data={data} columns={columns} />
```

...and this is the result!

![The table we created showing our cats name, age in years and color. Where the name column is wider than the other columns.](assets/cattable1.jpg "Our result")

Now you can play around with the columns definition. Add the other properties from our cat object and define different widths for each column.

# A note on the keyof type

The keyof type is very powerful, and one of my favorite parts of typescript. When making the ColumnDefinitionType you might have wondered why we didn't do it like this instead:

```javascript
export type ColumnDefinitionType<T> = {
    field: keyof T; // now we don't need the K extends keyof T anymore!
    header: string;
    width?: number;
}
```

In our Table example this would actually work just fine. However, there is a difference!

To illustrate the difference let us look at these two, seemingly similar, functions:

```javascript
function getValue<T extends unknown>(obj: T, key: keyof T) {
 // uses keyof T
  return obj[key];
}

function getValue2<T, K extends keyof T>(obj: T, key: K) {
 // uses K
  return obj[key];
}
```

These functions do the same thing. You send in an object and a key, and the functions returns the value for that property.
So if we send in our cat object from before with the key 'name', we should get the name of the cat in return. Let's try it with the first function:

```javascript
const name = getValue(cat, 'name');
name.toLowerCase(); // error!
```

It gives an error! But we know that the name property is a string, so calling `toLoverCase()` on it should work, right 🤔? 
Not exactly. Because the type of our key is not linked to the 'name' property the function doesn't know which type it should return when we do `obj[key]`(`cat['name']`). It could be any of the types defined within our Cat type: string | number | undefined.

If we call the second function however

```javascript
const name = getValue2(cat, 'name'); 
name.toLowerCase(); // no error
```

We don't get an error! Because now there is a link between the type of the `obj[key]` and the key. Because the property 'name' is a string, `obj['name']` will also be a string.

I hope you had fun making this Table component with me, and that you learned something new about typescript 😊
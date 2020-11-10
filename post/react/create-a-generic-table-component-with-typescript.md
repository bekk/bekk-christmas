---
calendar: react
post_year: 2020
post_day: 22
title: Create a generic table with React and Typescript
image: https://i.imgsli.com/images/570580f9-d0e6-428a-ada7-2b492c06e2cf.png
ingress: When I first started out with Typescript I found it very difficult to
  create the correct types when making generic components. In this article we
  will create a generic Table component that can be used with any set of
  objects.
authors:
  - Miina Lervik
---
This article assumes you already have some basic knowledge about React and Typescript.

# Lets get started!

I will be using a data set of cats.🐱 The cat objects will look like this:

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

The Table component takes in data and columns as props, then renders a TableHeader and TableRows. I will get back to those shortly. First lets take a closer look at the props defined in TableProps.

```javascript
type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
    width?: number;
}

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}

const style = {
  borderCollapse: 'collapse'
} as const

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
  return (
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

## `<T, K extends keyof T>`
T means "any type is ok". In our case T will be the cat object. `K extends keyof T` means that K is a valid key of T:
```javascript
const name = cat.name;
// same as:
const nameKey = 'name';
const name = cat[nameKey];
```
We see that the K is used as a type for our `key` property. This means that key can only be one of the properties we have in our cat object: 'name', 'age', 'favoriteFood'...

The data that we send in is an `Array<T>`, so in our case an array of cat objects. But as I said, it could be anything!

Finally, the Table component returns JSX.Element. This is what a function component normally returns and you often don't have to define this return type as typescript will be able to guess the return type for you.

# Custom headers
Lets look at the TableHeader component. It takes in columns as props, and the type definition is the same as for our table component.

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

By using our columns definition you can decide the order and width of each column without having to alter the data set in any way. If you want 'age' to be displayed before 'name' in your cat table, then all you do is define that in the columns definition. You can also decide to only display some of the properties in you data object.

# Lets look at TableRows
It takes in both data and columns as props.

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
              {row[column.key]}
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

## `{row[column.key]}`
We create each row by mapping though our data set (our list of cats 🐱). For each cat object we use the columns definition to pick which properties should be placed first, second, third... in our table. We do this by calling `row[column.key]`. Row is our cat. If `column.key` returns 'name' then this is the same as saying `cat.['name']` or `cat.name`.

# Putting it together
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
      key: 'name',
      header: 'Name',
      width: 150
    },
    {
      key: 'age',
      header: 'Age in years',
    },
    {
      key: 'color',
      header: 'Color'
    }
  ]
```
And then we send the data and columns into our table:

```javascript
<Table data={data} columns={columns} />
```
![The table we created showing our cats name, age in years and color. Where the name column is wider than the other columns.](/assets/cattable1.jpg "Our result")

Now you can play around with the columns definition. Add the other properties from our cat object and define different widths for each column.

## Keyof T or keyof Cat?
When we create the columns definition for our cat object we see how the `<T, K extends keyof T>` is used with the specific definition: `<Cat, keyof Cat>`. In your columns definition try to alter the key: 'name', to key: 'Name' (capital N). Typescript will give you an error because "Name" is not a valid key of our cat object! This means that if you rename the properties in your data set typescript will let you know that you also have to rename the key property in your column definition! It's amazing!😻

### A note on the keyof type

The keyof type is one of my favorite parts of typescript. When making the ColumnDefinitionType you might have wondered why we didn't do it like this instead:
```javascript
export type ColumnDefinitionType<T> = {
    key: keyof T; // now we don't need the 'K extends keyof T' anymore!
    header: string;
    width?: number;
}
```

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
const name = getValue(cat, 'name'); // uses keyof T
name.toLowerCase(); // error!
```

It gives an error! But we know that the name property is a string, so calling `toLowerCase()` on it should work, right 🤔? 
Not exactly. Because the type of our key is not linked to the 'name' property the function doesn't know which type it should return when we do `obj[key]`(`cat['name']`). It could be any of the types defined within our Cat type: string | number | undefined.

If we call the second function however
```javascript
const name = getValue2(cat, 'name'); // uses K extends keyof T
name.toLowerCase(); // no error
```

We don't get an error! Because now there is a link between the type of the `obj[key]` and the key. Because the property 'name' is a string, `cat['name']` will also be a string.

I hope you had fun making this Table component with me, and that you learned something new about typescript 😊
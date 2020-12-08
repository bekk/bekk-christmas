---
calendar: react
post_year: 2020
post_day: 9
title: Feel You Need Some Validation
image: https://images.unsplash.com/photo-1493780758133-e5cfb0d00354?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2097&q=80
ingress: "He couldn't believe it. This certainly couldn't be true. Someone else
  must have made a mistake here. He read the email a second time. Maybe he
  missed something and the whole thing was just a big misunderstanding? But he
  didn't, of course. He is the kind of person who always pays attention to
  typos, therefore reading it again was quite pointless. Anger started spreading
  through him. How dare they? It felt so incredibly stupid and unfair.
  Especially considering he was such a law-abiding citizen. He despised those
  who didn't follow rules. They couldn't possibly mean that he was one of them?
  Yet this is exactly what the email was saying: \"We can inform you that you
  unfortunately have used the wrong licence plate in the app, which is why you
  have been given a fine. In this case the fine is issued on **AB12345**, while
  parking was activated for **AB1234** in the app.\". Filled with rage, he
  locked his phone and shoved it back into his pocket. He missed one bloody
  number!"
links:
  - title: React Hook Form
    url: https://react-hook-form.com/
authors: []
---
## Validation to the Rescue

In Norway, license plates for cars follow a certain pattern, they consist of two letters and five digits (there are some exceptions, such as personal license plates, but we will ignore those). Considering this, we realize that the above scenario could have been avoided merely by adding some form validation. For this, we will utilize [React Hook Form] (https://react-hook-form.com/), which has become quite popular over the last year. React Hook Form is easy to use, quite lightweight and very performant. It has built-in validation, but also supports schema-based form validation with other tools such as [Yup](https://github.com/jquense/yup), [Superstruct](https://github.com/ianstormtaylor/superstruct) and [Joi](https://github.com/sideway/joi).

Let's assume we have this very basic skeleton for a parking app:

```javascript
export default function App() {
  const onFormSubmit = (e) => e.preventDefault();

  return (
    <>
      <h1>Parking App</h1>
      <form onSubmit={onFormSubmit}>
        <label>License number</label>
        <input name="licenseNo" placeholder="AA11111" />
        <button>Activate parking</button>
      </form>
    </>
  );
}
```
The app contains a form with a text input and a button. We also added an `onSubmit` method which prevents submitting the form and refreshing the page. Apart from that, the app doesn't really do anything useful. Let's add some validation:

```javascript
export default function App() {
  const { handleSubmit, register } = useForm();

  const onFormSubmit = (data) => console.log(data);

  return (
    <>
      <h1>Parking App</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label>License number</label>
        <input name="licenseNo" placeholder="AA11111" ref={register} />
        <button>Activate parking</button>
      </form>
    </>
  );
}
```

As you can see, we don't need to add much code to set up React Hook Form. We have to call the `useForm` hook which returns a bunch of methods. For the time being, we simply use `handleSubmit` and `register`. We then wrap the `onFormSubmit` method into the `handleSubmit` method. This will take care of only invoking `onFormSubmit` and pass the form data when all fields are valid (it also prevents the form from submitting, so we don't need to explicitly call the `preventDefault` method). Finally, we need to set the `register` method as the input field's ref attribute. But we are not there yet! The form allows every input, even if left empty. This is why we need to specify some validation rules:

```javascript
<input 
  name="licenseNo" 
  placeholder="AA11111" 
  ref={register({
    required: "You must enter a license number.",
    pattern: {
      value: /^[a-z]{2}\d{5}$/i,
      message: "The license number must be a combination of two letters and five digits."
    }
  })}
/>
```

When registering the input field, we can add several options to adjust how the field should be validated. In the above example, we tell our form that the field is required and that the value must match a specific regex pattern. We also define some error messages. If we try to submit the form but validation fails, the error message is returned with by `useForm` as an object called `errors`. Every form field gets its own error message corresponding to the fields `name` attribute:

```javascript 
{errors.licenseNo && errors.licenseNo.message}
```

Alternatively, we can use a simple component, `ErrorMessage` (we need to install a seperate NPM package first):

```javascript
<ErrorMessage
  errors={errors}
  name="licenseNo"
/>
```

This is all we need to avoid registering an invalid license number! However, there are some more concepts we should look at.

## Controlled vs. Uncontrolled
React Hook Form is designed to work best with *uncontrolled components*. This means that form data is handled by the DOM itself and can be accessed directly using refs (this is why we put the `register` method there). *Controlled components* on the other side, use event handlers such as `onChange` to update values at state change. Many third-party libraries use controlled components, and luckily there is a way we can use those together with React Hook Form:

```javascript
<Controller
  as={ReactSelect}
  name="fuelType"
  control={control}
  defaultValue={""}
  rules={{ required: "You must select a fuel type." }}
  options={[
    { value: "electric", label: "Electric" },
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" }
  ]}
  isClearable
/>
```



## Form Context
When moving input fields to shared components in order to make them reusable, you can of course pass all neccessary methods from `useForm` as props. In many cases, wrapping the whole form inside a `FormProvider` and accessing the form's context by using `useFormContext` might be a more elegant solution:

```javascript
const methods = useForm();

return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <LicenseNoInput />
        <button>Register parking</button>
      </form>
    </FormProvider>
  );
}
```

The `LicenseNoInput` component can then access the form methods as easy as this:

```javascript
  const { errors, register } = useFormContext();
```

Let's wrap up everything, add some styling and a little bit more logic and we got our very own parking app with working validation!

[LINK TO CODESANDBOX]

## A Swiss Army Knife
There is so much more you can do with React Hook Form! It's too bad I can't cover everything in a single article. I can recommend a look at the [official documentation](https://react-hook-form.com/api/), which also provides other useful examples. I personally have been using this tool for about a year now and have never been in a situation where it failed to solve a problem. If you are still not convinced, the fact that TypeScript is fully supported will hopefully change your mind.
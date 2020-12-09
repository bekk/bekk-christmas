---
calendar: react
post_year: 2020
post_day: 9
title: Validate Your Parking
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
authors:
  - Markus Rauhut
---
## Validation to the Rescue

In Norway, license plates for cars follow a certain pattern: they consist of two letters and five digits (there are some exceptions, such as personal license plates). Considering this, we realize that the above scenario could have been avoided merely by adding some form validation! For this, we will utilize [React Hook Form](https://react-hook-form.com/), which has become quite popular over the last year. React Hook Form is easy to use, quite lightweight and very performant. It has built-in validation, but also supports schema-based form validation with other tools such as [Yup](https://github.com/jquense/yup), [Superstruct](https://github.com/ianstormtaylor/superstruct) and [Joi](https://github.com/sideway/joi).

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
        <button>Start parking</button>
      </form>
    </>
  );
}
```

The app contains a form with a text input and a button. We also added an `onSubmit` method that prevents the form from being submitted and the page from being refreshed. Apart from that, the app doesn't really do anything meaningful. Let's add some validation:

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
        <button>Start parking</button>
      </form>
    </>
  );
}
```

As you can see, we don't need to add much code to set up React Hook Form. We have to call the `useForm` hook which returns a bunch of methods. For the time being, we simply use `handleSubmit` and `register`. We then wrap the `onFormSubmit` method into the `handleSubmit` method. This will take care of only invoking `onFormSubmit` and pass the form data when all fields are valid (it also prevents the form from submitting, so we don't need to explicitly call the `preventDefault` method). Finally, we need to set the `register` method as the input field's ref attribute. But this is not the end of the story! The form allows any input, even if it is left empty. This is why we have to specify some validation rules:

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

When registering the input field, we can add several options to adjust how the field should be validated. In the above example, we tell our form that the field is required and that the value must match a specific regex pattern. We also define some error messages. If we try to submit the form, but validation fails, the error message is returned by `useForm` as an object called `errors`. Every form field gets its own error message corresponding to the field's `name` attribute:

```javascript 
{errors.licenseNo && errors.licenseNo.message}
```

Alternatively, we can use a simple component, `ErrorMessage` (we must first install a separate NPM package):

```javascript
<ErrorMessage
  errors={errors}
  name="licenseNo"
/>
```

This is all we need to avoid registering an invalid license number! However, there are some more concepts we should have a look at.

## Controlled vs. Uncontrolled
React Hook Form is designed to work best with *uncontrolled components*. This means that form data is handled by the DOM itself and can be accessed directly using refs (which is why we put the `register` method there). *Controlled components* on the other hand, use event handlers such as `onChange` to update values at state change. Many third-party libraries use controlled components, and luckily there is a way we can use those together with React Hook Form:

```javascript
<Controller
  as={ReactSelect}
  name="fuelType"
  rules={{ required: "You must select a fuel type." }}
  options={[
    { value: "electric", label: "Electric" },
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" }
  ]}
  isClearable
/>
```

We add a [React Select](https://github.com/JedWatson/react-select) for choosing the cars fuel type by wrapping it inside a `Controller` component using the `as` prop. The Controller automatically injects the `onChange`, `onBlur` and `value` props into the wrapped component. The same applies to other props that may be required by the underlying component (in this case the props `options` and `isClearable`). Validation rules are applied by setting the `rules` prop. Although this is the preferred syntax, you sometimes need to use the `render` prop instead of the `as` prop, which lets you customize events, value and ref:

```javascript
<Controller
  name="fuelType"
  rules={{ required: "You must select a fuel type." }}
  render={({ onChange, onBlur, value, ref }) => (
    <ReactSelect
      options={[
        { value: "electric", label: "Electric" },
        { value: "petrol", label: "Petrol" },
        { value: "diesel", label: "Diesel" }
      ]}
      onChange={onChange}
      onBlur={onBlur}
      inputValue={value?.key}
      inputRef={ref}
    />
  )}
/>
```

## Form Context
When moving input fields to shared components in order to make them reusable, you can of course pass all neccessary methods from `useForm` as props. In many cases, it would be a more elegant solution to put the whole form into a `FormProvider` and access the context of the form with `useformContext`:

```javascript
const methods = useForm();

return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <LicenseNoInput />
        <button>Start parking</button>
      </form>
    </FormProvider>
  );
}
```

The `LicenseNoInput` component can then access the form methods as simple as this:

```javascript
const { errors, register } = useFormContext();
```

Let's pack it all up, add a little more logic and styling and voilà – we have a parking app with form validation that actually works!

<iframe src="https://codesandbox.io/embed/react-hook-formadvanced-f3mey?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.jsx&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-hook-form_advanced"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Like a Swiss Army Knife
There is so much more you can do with React Hook Form! It's too bad I can't cover it all in a single article. I can recommend a look at the [official documentation](https://react-hook-form.com/api/), which also provides many useful examples. Personally, I have been using this tool for about a year now and have never been in a situation where it couldn't solve a problem. If you are still not convinced, the fact that TypeScript is fully supported will hopefully change your mind.
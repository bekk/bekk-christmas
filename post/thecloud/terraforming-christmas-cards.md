---
calendar: thecloud
post_year: 2019
post_day: 20
title: Terraforming Christmas Cards
image: >-
  https://images.unsplash.com/photo-1512440929676-9dfaadc6891c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80
ingress: >-
  So like every year, Christmas is approaching too fast, and like every year I’m
  late at writing Christmas cards! Like all other complex problems in life, also
  this can be tackled by using the open source infrastructure as code tool
  Terraform!
links:
  - title: Terraform
    url: 'https://www.terraform.io/'
  - title: Sourcecode
    url: 'https://github.com/landro/terraform-christmas-postcards'
authors:
  - Stefan Magnus Landrø
---

Now from last year, I had the list of friends and their respective addresses in a CSV file that looks like this:

```csv
name,street,zip,city,country
Julenissen,Julenissens postkontor,1440,Drøbak,Norway
Santa Claus,Santa Claus's Main Post Office,96930,Napapiiri,Finland
Father Christmas,Santa's Grotto,XM4 5HQ,Reindeerland,United Kingdom
An den Weihnachtsmann,Weihnachtspostfiliale,16798,Himmelpfort,Germany
```

I then quickly put together a Christmas card template file that looks like the following:

```
${name}
${street}
%{ if country == "United Kingdom" }${city} ${zip}%{ else }${zip} ${city}%{ endif }
${country}


Dear ${name},

Merry Christmas and a Happy New Year!
```

The Brits are a bit peculiar about [how they address mail](https://www.postoffice.co.uk/mail/how-to-address-mail) 
compared to the rest of us, and I therefore had to add an [*if directive*](https://www.terraform.io/docs/configuration/expressions.html#string-templates)  
in the template.

In order to actually generate some Christmas cards, I decided to write all the cards to disk using
the [local_file](https://www.terraform.io/docs/providers/local/r/file.html) resource in Terraform in combination
with the new [for_each](https://www.terraform.io/docs/configuration/resources.html#for_each-multiple-resource-instances-defined-by-a-map-or-set-of-strings)
resource meta-argument and the new [for](https://www.terraform.io/docs/configuration/expressions.html#for-expressions) 
expression (these features were added to Terraform in version 0.12.0 and 0.12.6 respectively). Combine all that with the
[templatefile](https://www.terraform.io/docs/configuration/functions/templatefile.html) expression, and you end up with this
Terraform "one-liner":

```hcl
resource "local_file" "christmascard" {
  for_each = { for address in csvdecode(file("${path.module}/addresses.csv")) : address.country => address }
  content  = templatefile("${path.module}/card.tmpl", each.value)
  filename = "${path.module}/cards/${each.key}.txt"
}
```

Whys is this cool you might ask? Well, there a lots of features in Terraform that allow you to do stuff that you can't do
with any of the other infrastructure as code tools out there. Here's a brief list of features that come in handy on a 
regular basis when working with Terraform:

- [Built-in functions](https://www.terraform.io/docs/configuration/functions.html 
) that let you do anything from math to crypto
- [Miscellaneous Providers](https://www.terraform.io/docs/providers/type/misc-index.html) that let you do anything from 
generating TLS certificates to random passwords. These are all non-cloud related resources really.

Source code
------------

If you're keen on running this example on your laptop, do the following:

```shell
git clone https://github.com/landro/terraform-christmas-postcards
cd terraform-christmas-postcards
terraform init
terraform apply
```

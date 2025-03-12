# POS Product Card - Adding Quantity on Card

## Configuration
Add the following assets to the `__manifest__.py` file to ensure the custom XML and JavaScript files are loaded in POS:

```python
'assets': {
    'point_of_sale._assets_pos': [
        'module_name/static/src/xml/pos_product_quantity.xml',
        'module_name/static/src/js/pos_product_quantity.js',
    ],
},
```
Replace `module_name` with your actual module's name.

## File Structure
```
module_name/
│── static/
│   ├── src/
│   │   ├── xml/
│   │   │   ├── pos_product_quantity.xml
│   │   ├── js/
│   │   │   ├── pos_product_quantity.js
│── __manifest__.py
│── __init__.py
```
/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { ProductCard } from "@point_of_sale/app/generic_components/product_card/product_card";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useTrackedAsync } from "@point_of_sale/app/utils/hooks";
import { useState, useEffect } from "@odoo/owl";
import { debounce } from "@web/core/utils/timing";

patch(ProductCard.prototype, {
  setup() {
    super.setup(...arguments);
    this.pos = usePos();
    this.quantity = useState({ value: null });

    this.fetchStock = useTrackedAsync(
      (product) => this.pos.getProductInfo(product, 1), // Pass the product object directly
      { keepLast: true }
    );

    const debouncedFetchStock = debounce(async (product) => {
      await this.fetchStock.call(product);
      if (this.fetchStock.status === "error") {
        console.error("Error fetching stock info:", this.fetchStock.result);
        return;
      }

      const productInfo = this.fetchStock.result?.productInfo;
      // console.log("productInfo",productInfo);
      if (!productInfo || !productInfo.warehouses) {
        console.error("Invalid product data received for:", product.id);
        return;
      }

      this.quantity.value = productInfo.warehouses[0]?.available_quantity || 0;
    }, 500);

    useEffect(
      () => {
        debouncedFetchStock(this.props.product); // Pass the complete product object
      },
      () => [this.props.product]
    );
  },
});

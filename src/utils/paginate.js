import _ from "lodash";

export function paginate(items, pageNum, pageSize) {
  const startIndex = (pageNum - 1) * pageSize;

  console.log("paginating");
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}

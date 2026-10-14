// Preserve the domain barrel boundary previously checked by no-restricted-syntax.
export default {
  meta: { name: "catarchy" },
  rules: {
    "no-domain-internals-export": {
      meta: {
        type: "problem",
        schema: [],
        messages: {
          internal:
            "Do not re-export service or model from barrel index. Keep them internal to the domain.",
        },
      },
      create(context) {
        function checkExport(node) {
          if (
            node.source &&
            /\/(service|model)(\.ts)?$/.test(node.source.value)
          ) {
            context.report({ node, messageId: "internal" });
          }
        }
        return {
          ExportAllDeclaration: checkExport,
          ExportNamedDeclaration: checkExport,
        };
      },
    },
  },
};

const YAML = require("yamljs");
const fs = require("fs");
const path = require("path");

function loadSwaggerSpec() {
  const baseSpec = {
    openapi: "3.0.0",
    info: {
      title: "Mock API Service",
      version: "1.0.0",
    },
    servers: [{ url: "/api" }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  };

  // 自动加载所有模块的swagger文档
  const modules = ["users", "accounts"];
  modules.forEach((module) => {
    const swaggerPath = path.join(__dirname, module, "swagger.yaml");
    const spec = YAML.load(swaggerPath);

    // 合并paths
    baseSpec.paths = { ...baseSpec.paths, ...spec.paths };

    // 合并components
    if (spec.components) {
      Object.keys(spec.components).forEach((type) => {
        baseSpec.components[type] = {
          ...baseSpec.components[type],
          ...spec.components[type],
        };
      });
    }
  });

  return baseSpec;
}

module.exports = loadSwaggerSpec();

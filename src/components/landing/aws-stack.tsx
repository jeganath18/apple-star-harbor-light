const LAYERS = [
  {
    title: "Ingress",
    items: ["API Gateway", "AWS Lambda"],
  },
  {
    title: "Orchestration",
    items: ["AWS Step Functions", "Amazon Bedrock"],
  },
  {
    title: "Build & registry",
    items: ["Amazon ECR", "Amazon S3"],
  },
  {
    title: "Compute",
    items: ["Amazon ECS", "AWS Fargate", "Amazon EC2 Graviton", "QEMU/binfmt"],
  },
  {
    title: "State",
    items: ["Amazon DynamoDB", "Amazon S3 reports"],
  },
];

export function AwsStack() {
  return (
    <section id="aws" className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-2xs font-medium tracking-wide text-infra uppercase">AWS-native control plane</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight">
        The path is orchestrated on AWS, not wrapped in a black box.
      </h2>
      <div className="mt-10 space-y-3">
        {LAYERS.map((layer) => (
          <div key={layer.title} className="grid gap-3 rounded-lg bg-card p-4 shadow-border md:grid-cols-[160px_1fr] md:items-center">
            <p className="font-mono text-2xs tracking-wide text-subtle uppercase">{layer.title}</p>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className="rounded-sm bg-background px-2.5 py-1 font-mono text-xs shadow-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

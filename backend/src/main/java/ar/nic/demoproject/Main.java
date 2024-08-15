package ar.nic.demoproject;

import ar.nic.demoproject.config.CustomSpanExporter;
import io.opentelemetry.exporter.logging.LoggingSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.SimpleSpanProcessor;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(proxyBeanMethods = false)
@OpenAPIDefinition(
        info =
                @Info(
                        title = "Demo project",
                        version = "1.0",
                        description = "Documentation APIs v1.0"))
public class Main {
    public static void main(String[] args) {
        SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
                //.addSpanProcessor(SimpleSpanProcessor.create(new LoggingSpanExporter()))
                .addSpanProcessor(SimpleSpanProcessor.create(new CustomSpanExporter()))
                .build();

        OpenTelemetrySdk.builder().setTracerProvider(tracerProvider).buildAndRegisterGlobal();

        SpringApplication.run(Main.class, args);

        Runtime.getRuntime().addShutdownHook(new Thread(tracerProvider::shutdown));

    }
}

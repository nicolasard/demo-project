package ar.nic.demoproject.config;

import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.exporter.logging.LoggingSpanExporter;
import io.opentelemetry.sdk.common.CompletableResultCode;
import io.opentelemetry.sdk.common.InstrumentationScopeInfo;
import io.opentelemetry.sdk.trace.data.SpanData;
import io.opentelemetry.sdk.trace.export.SpanExporter;

import java.util.Collection;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * This is a custom Open Telemetry (OTEL) span expoter that implementes the otel SpanExporter.
 * It writes in a log file the result of the spans, in a compact way.
 * To do this I based on io.opentelemetry.exporter.logging.LoggingSpanExporter
 */
public class CustomSpanExporter implements SpanExporter {

    private static final Logger logger = Logger.getLogger(LoggingSpanExporter.class.getName());

    /**
     * Here we overwrite the export method to write a History log.
     * @param spans
     * @return
     */
    @Override
    public CompletableResultCode export(Collection<SpanData> spans) {
        StringBuilder sb = new StringBuilder(60);
        sb.setLength(0);
        long totalSpansDuration = 0;
        for (SpanData span : spans) {
            InstrumentationScopeInfo instrumentationScopeInfo = span.getInstrumentationScopeInfo();
            long spanDuration = span.getEndEpochNanos() - span.getStartEpochNanos();
            totalSpansDuration = spanDuration + totalSpansDuration;
            Map<AttributeKey<?>, Object> attributesMap = span.getAttributes().asMap();
            for (Map.Entry<AttributeKey<?>, Object> entry : attributesMap.entrySet()) {
                AttributeKey<?> key = entry.getKey();
                Object value = entry.getValue();
                sb.append(key).append(":").append(value).append(";");
            }
        }
        sb.append("DURATION:").append(totalSpansDuration).append(";");
        logger.log(Level.INFO, sb.toString());
        return CompletableResultCode.ofSuccess();
    }

    @Override
    public CompletableResultCode flush() {
        return CompletableResultCode.ofSuccess();
    }

    @Override
    public CompletableResultCode shutdown() {
        return CompletableResultCode.ofSuccess();
    }
}
